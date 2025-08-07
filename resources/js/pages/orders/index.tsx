import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Download, Eye, Calendar, Package, DollarSign } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    type: 'downloadable' | 'non_downloadable';
}

interface Order {
    id: number;
    order_number: string;
    product: Product;
    quantity: number;
    unit_price: number;
    total_price: number;
    status: string;
    delivered_at: string | null;
    warranty_expires_at: string | null;
    created_at: string;
}

interface OrdersPageProps {
    orders: {
        data: Order[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function OrdersIndex() {
    const { orders } = usePage<OrdersPageProps>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'processing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'cancelled':
            case 'refunded':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return '✅';
            case 'processing':
                return '⚡';
            case 'pending':
                return '⏳';
            case 'cancelled':
                return '❌';
            case 'refunded':
                return '↩️';
            default:
                return '📋';
        }
    };

    return (
        <AppShell>
            <Head title="My Orders" />
            
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <ShoppingCart className="h-8 w-8 text-blue-500" />
                        🛒 My Orders
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your purchases and download products
                    </p>
                </div>

                {/* Orders List */}
                {orders.data.length > 0 ? (
                    <>
                        <div className="space-y-4 mb-8">
                            {orders.data.map((order) => (
                                <Card key={order.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg mb-1">
                                                    Order #{order.order_number}
                                                </CardTitle>
                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                            <Badge className={getStatusColor(order.status)}>
                                                {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="pt-0">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Package className="h-4 w-4" />
                                                    Product Details
                                                </h4>
                                                <p className="text-sm mb-1">
                                                    <strong>{order.product.title}</strong>
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    Type: {order.product.type === 'downloadable' ? '📥 Downloadable' : '🔑 Credentials'}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Quantity: {order.quantity}
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    Order Summary
                                                </h4>
                                                <p className="text-sm mb-1">
                                                    Unit Price: <span className="font-medium">${order.unit_price.toFixed(2)}</span>
                                                </p>
                                                <p className="text-lg font-bold text-green-600">
                                                    Total: ${order.total_price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                {order.delivered_at && (
                                                    <span>
                                                        ✅ Delivered: {new Date(order.delivered_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {order.warranty_expires_at && (
                                                    <span>
                                                        🛡️ Warranty until: {new Date(order.warranty_expires_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <Link href={route('orders.show', order.id)}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                
                                                {order.status === 'delivered' && order.product.type === 'downloadable' && (
                                                    <Link href={route('orders.download', order.id)}>
                                                        <Button size="sm">
                                                            <Download className="h-4 w-4 mr-1" />
                                                            Download
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {orders.links && (
                            <div className="flex justify-center space-x-2">
                                {orders.links.map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            preserveState
                                            className={`px-3 py-2 rounded-md text-sm ${
                                                link.active 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-400 dark:bg-gray-800"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">
                            Start shopping to see your orders here
                        </p>
                        <Link href={route('products.index')}>
                            <Button>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}