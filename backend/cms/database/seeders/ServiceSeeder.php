<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            ['name' => 'WiFi', 'key' => 'wifi'],
            ['name' => 'Breakfast', 'key' => 'breakfast'],
            ['name' => 'Parking', 'key' => 'parking'],
            ['name' => 'Pool', 'key' => 'pool'],
            ['name' => 'Air Conditioning', 'key' => 'air-conditioning'],
            ['name' => 'Laundry', 'key' => 'laundry'],
            ['name' => 'TV', 'key' => 'tv'],
            ['name' => 'Workspace', 'key' => 'workspace'],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['key' => $service['key']],
                ['name' => $service['name']]
            );
        }
    }
}
