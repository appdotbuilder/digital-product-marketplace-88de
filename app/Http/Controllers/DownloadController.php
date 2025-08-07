<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private OrderService $orderService
    ) {}

    /**
     * Show the download page or initiate download for downloadable products.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function show(Request $request, Order $order)
    {
        if (!$this->orderService->canViewOrder($request->user(), $order)) {
            abort(403);
        }

        $order->load('product');
        $product = $order->product;
        
        if ($order->status !== 'delivered' || !$product) {
            abort(403, 'Download not available for this order.');
        }

        $productType = $product->getAttribute('type');
        $downloadFile = $product->getAttribute('download_file');
        $productTitle = $product->getAttribute('title');
        
        if ($productType !== 'downloadable' || !$downloadFile) {
            abort(403, 'Download not available for this order.');
        }

        $filePath = storage_path('app/private/products/' . $downloadFile);
        
        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return response()->download($filePath, $productTitle . '.' . pathinfo($filePath, PATHINFO_EXTENSION));
    }
}