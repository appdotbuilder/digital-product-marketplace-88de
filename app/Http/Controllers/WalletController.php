<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepositRequest;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display the user's wallet information.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $wallet = $user->wallet;
        
        $transactions = $user->walletTransactions()
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('wallet/index', [
            'wallet' => $wallet,
            'transactions' => $transactions,
            'referralEarnings' => $user->getTotalReferralEarnings()
        ]);
    }

    /**
     * Show the deposit form.
     */
    public function create()
    {
        return Inertia::render('wallet/deposit');
    }

    /**
     * Store a new deposit request.
     */
    public function store(StoreDepositRequest $request)
    {
        $user = $request->user();

        // Handle proof image upload
        $proofImagePath = null;
        if ($request->hasFile('proof_image')) {
            $proofImagePath = $request->file('proof_image')->store('deposit-proofs', 'public');
        }

        WalletTransaction::create([
            'user_id' => $user->id,
            'type' => 'deposit',
            'status' => 'pending',
            'amount' => $request->amount,
            'transaction_id' => $request->transaction_id,
            'proof_image' => $proofImagePath,
            'notes' => $request->notes,
        ]);

        return redirect()->route('wallet.index')->with('success', 'Deposit request submitted successfully! It will be reviewed by an administrator.');
    }
}