<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProductInventory
 *
 * @property int $id
 * @property int $product_id
 * @property string $credentials
 * @property bool $is_used
 * @property int|null $order_id
 * @property \Illuminate\Support\Carbon|null $assigned_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereAssignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereCredentials($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereIsUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory available()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductInventory used()
 * @method static \Database\Factories\ProductInventoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ProductInventory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'credentials',
        'is_used',
        'order_id',
        'assigned_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_used' => 'boolean',
        'assigned_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the product that this inventory item belongs to.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the order that this inventory item is assigned to.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Scope a query to only include available items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_used', false);
    }

    /**
     * Scope a query to only include used items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUsed($query)
    {
        return $query->where('is_used', true);
    }

    /**
     * Assign this inventory item to an order.
     *
     * @param int $orderId
     * @return void
     */
    public function assignToOrder(int $orderId): void
    {
        $this->update([
            'is_used' => true,
            'order_id' => $orderId,
            'assigned_at' => now(),
        ]);
    }
}