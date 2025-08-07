import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Wallet, Package, TrendingUp, Plus, Eye, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="container mx-auto px-6 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">👋 Welcome Back!</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your digital marketplace experience
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Wallet Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600 mb-2">
                                $0.00
                            </div>
                            <Link href={route('wallet.index')}>
                                <Button size="sm" variant="outline" className="w-full">
                                    <Wallet className="h-4 w-4 mr-1" />
                                    View Wallet
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600 mb-2">
                                0
                            </div>
                            <Link href={route('orders.index')}>
                                <Button size="sm" variant="outline" className="w-full">
                                    <Package className="h-4 w-4 mr-1" />
                                    View Orders
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Spent
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600 mb-2">
                                $0.00
                            </div>
                            <p className="text-xs text-gray-500">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Referral Earnings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600 mb-2">
                                $0.00
                            </div>
                            <p className="text-xs text-gray-500">From referrals</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <Link href={route('products.index')} className="block">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <ShoppingCart className="h-6 w-6 text-blue-500" />
                                    🛒 Browse Products
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Discover digital products and services
                                </p>
                                <div className="flex items-center text-blue-500 font-medium">
                                    Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                                </div>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <Link href={route('wallet.create')} className="block">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Plus className="h-6 w-6 text-green-500" />
                                    💰 Add Funds
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Deposit cryptocurrency to your wallet
                                </p>
                                <div className="flex items-center text-green-500 font-medium">
                                    Deposit Now <ArrowRight className="h-4 w-4 ml-1" />
                                </div>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <Link href={route('orders.index')} className="block">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Eye className="h-6 w-6 text-purple-500" />
                                    📦 My Orders
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Track purchases and downloads
                                </p>
                                <div className="flex items-center text-purple-500 font-medium">
                                    View Orders <ArrowRight className="h-4 w-4 ml-1" />
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                </div>

                {/* Getting Started Guide */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            🚀 Getting Started
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4">
                                <div className="text-2xl mb-2">💳</div>
                                <h4 className="font-semibold mb-2">1. Add Funds</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Deposit cryptocurrency to start purchasing
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-2xl mb-2">🛍️</div>
                                <h4 className="font-semibold mb-2">2. Browse Products</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Find downloadable files and digital services
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-2xl mb-2">📥</div>
                                <h4 className="font-semibold mb-2">3. Download & Enjoy</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Access your purchases instantly
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>✨ Platform Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-3">🔐 Secure Transactions</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>• Cryptocurrency payments</li>
                                    <li>• Escrow protection for orders</li>
                                    <li>• Warranty coverage available</li>
                                    <li>• Secure download links</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3">💎 Referral System</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>• Earn commissions from referrals</li>
                                    <li>• Share your unique referral code</li>
                                    <li>• Track earnings in real-time</li>
                                    <li>• Instant commission payouts</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}