<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    /**
     * Get all reservations (admin) or user's reservations (customer)
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Reservation::with(['user', 'room']);

        // If not admin, only show user's own reservations
        if (!$user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $reservations = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'reservations' => $reservations,
        ]);
    }

    /**
     * Get single reservation
     */
    public function show($id, Request $request)
    {
        $reservation = Reservation::with(['user', 'room'])->findOrFail($id);

        // Check authorization
        if (!$request->user()->isAdmin() && $reservation->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'reservation' => $reservation,
        ]);
    }

    /**
     * Create new reservation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'payment_method' => 'nullable|string|max:255',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Check availability
        if (!$room->isAvailable($validated['start_date'], $validated['end_date'])) {
            return response()->json([
                'message' => 'Room is not available for the selected dates',
            ], 422);
        }

        // Calculate nights and total price
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $nights = $startDate->diffInDays($endDate);
        $totalPrice = $nights * $room->price_per_night;

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'room_id' => $validated['room_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'nights' => $nights,
            'total_price' => $totalPrice,
            'payment_method' => $validated['payment_method'] ?? null,
            'status' => 'pending-payment',
        ]);

        $reservation->load(['user', 'room']);

        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation created successfully',
        ], 201);
    }

    /**
     * Update reservation status
     */
    public function updateStatus($id, Request $request)
    {
        $reservation = Reservation::findOrFail($id);

        // Check authorization
        if (!$request->user()->isAdmin() && $reservation->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending-payment,paid,confirmed,cancelled',
        ]);

        // Only admin can mark as paid/confirmed, users can only cancel
        if (!$request->user()->isAdmin() && in_array($validated['status'], ['paid', 'confirmed'])) {
            return response()->json([
                'message' => 'Only admin can mark reservations as paid or confirmed',
            ], 403);
        }

        $reservation->update([
            'status' => $validated['status'],
        ]);

        $reservation->load(['user', 'room']);

        return response()->json([
            'reservation' => $reservation,
            'message' => 'Reservation status updated successfully',
        ]);
    }

    /**
     * Cancel reservation
     */
    public function cancel($id, Request $request)
    {
        $reservation = Reservation::findOrFail($id);

        // Check authorization
        if (!$request->user()->isAdmin() && $reservation->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $reservation->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'message' => 'Reservation cancelled successfully',
        ]);
    }

    /**
     * Get dashboard statistics (admin only)
     */
    public function stats()
    {
        $totalReservations = Reservation::count();
        $activeReservations = Reservation::whereIn('status', ['paid', 'confirmed'])
            ->whereDate('end_date', '>=', now())
            ->count();
        $paidReservations = Reservation::where('status', 'paid')->count();
        $pendingPayments = Reservation::where('status', 'pending-payment')->count();
        $totalRevenue = Reservation::whereIn('status', ['paid', 'confirmed'])
            ->sum('total_price');

        return response()->json([
            'stats' => [
                'total_reservations' => $totalReservations,
                'active_reservations' => $activeReservations,
                'paid_reservations' => $paidReservations,
                'pending_payments' => $pendingPayments,
                'total_revenue' => $totalRevenue,
            ],
        ]);
    }
}
