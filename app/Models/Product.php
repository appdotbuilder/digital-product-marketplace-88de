<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Product
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string|null $image
 * @property float $price
 * @property int $stock_quantity
 * @property int $warranty_days
 * @property string $type
 * @property string|null $download_file
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDownloadFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereWarrantyDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product active()
 * @method static \Illuminate\Database\Eloquent\Builder|Product downloadable()
 * @method static \Illuminate\Database\Eloquent\Builder|Product nonDownloadable()
 * @method static \Database\Factories\ProductFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image',
        'price',
        'stock_quantity',
        'warranty_days',
        'type',
        'download_file',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the orders for the product.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the inventory items for the product.
     */
    public function inventory(): HasMany
    {
        return $this->hasMany(ProductInventory::class);
    }

    /**
     * Get available inventory items.
     */
    public function availableInventory(): HasMany
    {
        return $this->hasMany(ProductInventory::class)->where('is_used', false);
    }

    /**
     * Scope a query to only include active products.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include downloadable products.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDownloadable($query)
    {
        return $query->where('type', 'downloadable');
    }

    /**
     * Scope a query to only include non-downloadable products.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNonDownloadable($query)
    {
        return $query->where('type', 'non_downloadable');
    }

    /**
     * Check if the product is downloadable.
     *
     * @return bool
     */
    public function isDownloadable(): bool
    {
        return $this->type === 'downloadable';
    }

    /**
     * Check if the product is non-downloadable.
     *
     * @return bool
     */
    public function isNonDownloadable(): bool
    {
        return $this->type === 'non_downloadable';
    }

    /**
     * Get available stock count.
     *
     * @return int
     */
    public function getAvailableStock(): int
    {
        if ($this->isDownloadable()) {
            return $this->stock_quantity;
        }

        return $this->availableInventory()->count();
    }
}