<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::active()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->min_price, function ($query, $minPrice) {
                $query->where('price', '>=', $minPrice);
            })
            ->when($request->max_price, function ($query, $maxPrice) {
                $query->where('price', '<=', $maxPrice);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => $request->only(['search', 'type', 'min_price', 'max_price'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        if (!$product->is_active) {
            abort(404);
        }

        $product->load(['inventory' => function ($query) {
            $query->available()->limit(1);
        }]);

        return Inertia::render('products/show', [
            'product' => $product,
            'availableStock' => $product->getAvailableStock()
        ]);
    }
}