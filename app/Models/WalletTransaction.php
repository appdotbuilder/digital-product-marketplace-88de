<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WalletTransaction
 *
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $status
 * @property float $amount
 * @property string|null $transaction_id
 * @property string|null $proof_image
 * @property string|null $notes
 * @property int|null $processed_by
 * @property \Illuminate\Support\Carbon|null $processed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereProcessedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereProcessedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereProofImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction pending()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction approved()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction deposits()

 * 
 * @mixin \Eloquent
 */
class WalletTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'status',
        'amount',
        'transaction_id',
        'proof_image',
        'notes',
        'processed_by',
        'processed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'processed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who processed the transaction.
     */
    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Scope a query to only include pending transactions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved transactions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include deposits.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDeposits($query)
    {
        return $query->where('type', 'deposit');
    }
}