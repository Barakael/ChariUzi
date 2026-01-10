<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('location')->default('Uzi Island, Zanzibar');
            $table->string('image_url');
            $table->decimal('price_per_night', 10, 2);
            $table->decimal('rating', 3, 2)->default(4.80);
            $table->integer('capacity')->default(2);
            $table->boolean('featured')->default(false);
            $table->string('category')->nullable();
            $table->string('sub_category')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
