<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private OrderService $orderService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with(['product'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $product = Product::findOrFail($request->product_id);
        $user = $request->user();

        $result = $this->orderService->processOrder($user, $product, $request->quantity);

        if (!$result['success']) {
            return back()->withErrors(['error' => $result['error']]);
        }

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Order $order)
    {
        if (!$this->orderService->canViewOrder($request->user(), $order)) {
            abort(403);
        }

        $order->load(['product', 'inventoryItems']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }
}