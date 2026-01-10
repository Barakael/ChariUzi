<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Get all services
     */
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'services' => $services,
        ]);
    }

    /**
     * Create new service (admin only)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'key' => 'required|string|max:255|unique:services,key',
        ]);

        $service = Service::create($validated);

        return response()->json([
            'service' => $service,
            'message' => 'Service created successfully',
        ], 201);
    }
}
