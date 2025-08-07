<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductInventory;
use App\Models\Referral;
use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Check if user can view the order.
     */
    public function canViewOrder(User $user, Order $order): bool
    {
        return $user->id === $order->user_id || $user->isAdmin();
    }

    /**
     * Process a new order.
     */
    public function processOrder(User $user, Product $product, int $quantity): array
    {
        $user->load('wallet');
        $wallet = $user->wallet;
        
        if (!$wallet) {
            return ['success' => false, 'error' => 'Wallet not found.'];
        }
        $totalPrice = $product->price * $quantity;

        // Validation  
        $walletBalance = $wallet->getAttribute('balance') ?? 0;
        $walletEscrowBalance = $wallet->getAttribute('escrow_balance') ?? 0;
        $availableBalance = $walletBalance - $walletEscrowBalance;
        
        if ($availableBalance < $totalPrice) {
            return ['success' => false, 'error' => 'Insufficient wallet balance.'];
        }

        if ($product->getAvailableStock() < $quantity) {
            return ['success' => false, 'error' => 'Insufficient stock available.'];
        }

        try {
            DB::transaction(function () use ($product, $user, $wallet, $quantity, $totalPrice) {
                // Create the order
                $order = Order::create([
                    'order_number' => Order::generateOrderNumber(),
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'total_price' => $totalPrice,
                    'status' => 'pending',
                ]);

                if ($product->isDownloadable()) {
                    // For downloadable products, deduct from wallet and mark as delivered
                    $wallet->decrement('balance', $totalPrice);
                    $order->markAsDelivered();
                    
                    // Reduce stock for downloadable products
                    $product->decrement('stock_quantity', $quantity);
                } else {
                    // For non-downloadable products, move to escrow
                    $wallet->increment('escrow_balance', $totalPrice);
                    
                    // Assign inventory items to the order
                    $inventoryItems = ProductInventory::where('product_id', $product->id)
                        ->available()
                        ->limit($quantity)
                        ->get();

                    foreach ($inventoryItems as $item) {
                        $item->assignToOrder($order->id);
                    }
                    
                    // Update order to processing
                    $order->update(['status' => 'processing']);
                }

                // Create wallet transaction
                WalletTransaction::create([
                    'user_id' => $user->id,
                    'type' => 'purchase',
                    'status' => 'completed',
                    'amount' => $totalPrice,
                    'notes' => "Purchase of {$product->title} (Order: {$order->order_number})",
                ]);

                // Process referral commission
                $this->processReferralCommission($user, $totalPrice);
            });

            return ['success' => true];
        } catch (\Exception $e) {
            return ['success' => false, 'error' => 'Order processing failed. Please try again.'];
        }
    }

    /**
     * Process referral commission.
     */
    protected function processReferralCommission(User $user, float $totalPrice): void
    {
        $referral = Referral::where('referred_id', $user->id)->first();
        if ($referral) {
            $commission = $totalPrice * ($referral->commission_rate / 100);
            $referral->addCommission($totalPrice);
            
            // Add commission to referrer's wallet
            $referrer = $referral->referrer;
            if ($referrer) {
                $referrer->load('wallet');
                $referrerWallet = $referrer->getAttribute('wallet');
                if ($referrerWallet) {
                    $referrerWallet->increment('balance', $commission);
                }
                
                // Create commission transaction
                WalletTransaction::create([
                    'user_id' => $referrer->getAttribute('id'),
                    'type' => 'commission',
                    'status' => 'completed',
                    'amount' => $commission,
                    'notes' => "Referral commission from {$user->name}'s purchase",
                ]);
            }
        }
    }
}