<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Wallet
 *
 * @property int $id
 * @property int $user_id
 * @property float $balance
 * @property float $escrow_balance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet query()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereEscrowBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUserId($value)
 * @method static \Database\Factories\WalletFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Wallet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'balance',
        'escrow_balance',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'balance' => 'decimal:2',
        'escrow_balance' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the wallet.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the wallet transactions.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class, 'user_id', 'user_id');
    }

    /**
     * Get the total available balance (balance - escrow).
     *
     * @return float
     */
    public function getAvailableBalance(): float
    {
        return $this->balance - $this->escrow_balance;
    }

    /**
     * Add funds to wallet.
     *
     * @param float $amount
     * @return void
     */
    public function addBalance(float $amount): void
    {
        $this->increment('balance', $amount);
    }

    /**
     * Deduct funds from wallet.
     *
     * @param float $amount
     * @return bool
     */
    public function deductBalance(float $amount): bool
    {
        if ($this->getAvailableBalance() >= $amount) {
            $this->decrement('balance', $amount);
            return true;
        }

        return false;
    }

    /**
     * Move funds to escrow.
     *
     * @param float $amount
     * @return bool
     */
    public function moveToEscrow(float $amount): bool
    {
        if ($this->getAvailableBalance() >= $amount) {
            $this->increment('escrow_balance', $amount);
            return true;
        }

        return false;
    }

    /**
     * Release funds from escrow.
     *
     * @param float $amount
     * @return void
     */
    public function releaseFromEscrow(float $amount): void
    {
        $this->decrement('escrow_balance', min($amount, $this->escrow_balance));
        $this->decrement('balance', $amount);
    }
}