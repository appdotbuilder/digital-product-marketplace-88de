import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, Key, ShoppingCart, Shield, Package, Clock } from 'lucide-react';
import type { SharedData } from '@/types';

interface Product {
    id: number;
    title: string;
    description: string;
    image: string | null;
    price: number;
    stock_quantity: number;
    warranty_days: number;
    type: 'downloadable' | 'non_downloadable';
    is_active: boolean;
    created_at: string;
}

interface ProductShowProps extends SharedData {
    product: Product;
    availableStock: number;
    [key: string]: unknown;
}

export default function ProductShow() {
    const { product, availableStock, auth } = usePage<ProductShowProps>().props;
    const [quantity, setQuantity] = useState(1);
    const [isOrdering, setIsOrdering] = useState(false);

    const totalPrice = product.price * quantity;

    const handlePurchase = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        setIsOrdering(true);
        router.post(route('orders.store'), {
            product_id: product.id,
            quantity: quantity,
        }, {
            onFinish: () => setIsOrdering(false),
            onError: () => setIsOrdering(false),
        });
    };

    return (
        <AppShell>
            <Head title={product.title} />
            
            <div className="container mx-auto px-6 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href={route('products.index')}>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Products
                        </Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Product Image/Icon */}
                    <div>
                        <Card className="aspect-square flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20">
                            <div className="text-center">
                                {product.type === 'downloadable' ? (
                                    <Download className="h-24 w-24 text-purple-500 mx-auto mb-4" />
                                ) : (
                                    <Key className="h-24 w-24 text-cyan-500 mx-auto mb-4" />
                                )}
                                <Badge variant={product.type === 'downloadable' ? 'default' : 'secondary'} className="text-sm">
                                    {product.type === 'downloadable' ? 'Downloadable Product' : 'Credential-based Product'}
                                </Badge>
                            </div>
                        </Card>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl font-bold text-green-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Package className="h-3 w-3" />
                                    Stock: {availableStock}
                                </Badge>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Features */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                {product.type === 'downloadable' ? (
                                    <>
                                        <Download className="h-4 w-4 text-green-500" />
                                        <span>Instant download after purchase</span>
                                    </>
                                ) : (
                                    <>
                                        <Key className="h-4 w-4 text-blue-500" />
                                        <span>Unique credentials delivered upon order processing</span>
                                    </>
                                )}
                            </div>

                            {product.warranty_days > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="h-4 w-4 text-purple-500" />
                                    <span>{product.warranty_days} days warranty included</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-orange-500" />
                                <span>
                                    {product.type === 'downloadable' 
                                        ? 'Delivered instantly' 
                                        : 'Processing time: 1-24 hours'
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Purchase Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Purchase Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={Math.min(10, availableStock)}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum: {Math.min(10, availableStock)} items
                                    </p>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="font-medium">Total Price:</span>
                                    <span className="text-xl font-bold text-green-600">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                {availableStock === 0 && (
                                    <p className="text-red-500 text-sm">⚠️ Out of stock</p>
                                )}
                            </CardContent>
                            <CardFooter className="space-y-3">
                                {auth.user ? (
                                    <Button
                                        onClick={handlePurchase}
                                        disabled={isOrdering || availableStock === 0 || quantity > availableStock}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {isOrdering ? (
                                            'Processing...'
                                        ) : (
                                            <>
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Buy Now - ${totalPrice.toFixed(2)}
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <div className="w-full space-y-2">
                                        <p className="text-sm text-center text-gray-500">
                                            Please sign in to purchase this product
                                        </p>
                                        <div className="flex gap-2">
                                            <Link href={route('login')} className="flex-1">
                                                <Button variant="outline" className="w-full">
                                                    Sign In
                                                </Button>
                                            </Link>
                                            <Link href={route('register')} className="flex-1">
                                                <Button className="w-full">
                                                    Register
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                All transactions are secured with encryption. Your payment information is protected.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                Delivery
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {product.type === 'downloadable' 
                                    ? 'Download links are provided immediately after successful payment.'
                                    : 'Credentials are delivered within 24 hours to your account dashboard.'
                                }
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-500" />
                                Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {product.warranty_days > 0 
                                    ? `${product.warranty_days} days warranty period with full support.`
                                    : 'Customer support available for any issues.'
                                }
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}