<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->text('credentials');
            $table->boolean('is_used')->default(false);
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamp('assigned_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('product_id');
            $table->index('is_used');
            $table->index('order_id');
            $table->index(['product_id', 'is_used']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_inventory');
    }
};