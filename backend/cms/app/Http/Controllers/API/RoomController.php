<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    /**
     * Get all rooms with optional filters
     */
    public function index(Request $request)
    {
        $query = Room::with('services');

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by featured
        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }

        // Filter by availability (date range)
        if ($request->has('start_date') && $request->has('end_date')) {
            $startDate = $request->start_date;
            $endDate = $request->end_date;

            $query->whereDoesntHave('reservations', function ($q) use ($startDate, $endDate) {
                $q->where('status', '!=', 'cancelled')
                    ->where(function ($q) use ($startDate, $endDate) {
                        $q->whereBetween('start_date', [$startDate, $endDate])
                            ->orWhereBetween('end_date', [$startDate, $endDate])
                            ->orWhere(function ($q) use ($startDate, $endDate) {
                                $q->where('start_date', '<=', $startDate)
                                    ->where('end_date', '>=', $endDate);
                            });
                    });
            });
        }

        $rooms = $query->get();

        return response()->json([
            'rooms' => $rooms,
        ]);
    }

    /**
     * Get single room
     */
    public function show($id)
    {
        $room = Room::with('services')->findOrFail($id);

        return response()->json([
            'room' => $room,
        ]);
    }

    /**
     * Create new room (admin only)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'image_url' => 'required|url',
            'price_per_night' => 'required|numeric|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'capacity' => 'nullable|integer|min:1',
            'featured' => 'boolean',
            'category' => 'nullable|string|max:255',
            'sub_category' => 'nullable|string|max:255',
            'services' => 'nullable|array',
            'services.*' => 'exists:services,id',
        ]);

        DB::beginTransaction();
        try {
            $serviceIds = $validated['services'] ?? [];
            unset($validated['services']);

            $room = Room::create($validated);

            if (!empty($serviceIds)) {
                $room->services()->attach($serviceIds);
            }

            $room->load('services');

            DB::commit();

            return response()->json([
                'room' => $room,
                'message' => 'Room created successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create room',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update room (admin only)
     */
    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location' => 'nullable|string|max:255',
            'image_url' => 'sometimes|url',
            'price_per_night' => 'sometimes|numeric|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'capacity' => 'nullable|integer|min:1',
            'featured' => 'boolean',
            'category' => 'nullable|string|max:255',
            'sub_category' => 'nullable|string|max:255',
            'services' => 'nullable|array',
            'services.*' => 'exists:services,id',
        ]);

        DB::beginTransaction();
        try {
            $serviceIds = $validated['services'] ?? null;
            unset($validated['services']);

            $room->update($validated);

            if ($serviceIds !== null) {
                $room->services()->sync($serviceIds);
            }

            $room->load('services');

            DB::commit();

            return response()->json([
                'room' => $room,
                'message' => 'Room updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update room',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete room (admin only)
     */
    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json([
            'message' => 'Room deleted successfully',
        ]);
    }

    /**
     * Check room availability
     */
    public function checkAvailability($id, Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $room = Room::findOrFail($id);
        $available = $room->isAvailable($request->start_date, $request->end_date);

        return response()->json([
            'available' => $available,
            'room_id' => $room->id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
    }
}
