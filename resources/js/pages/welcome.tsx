import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Download, Shield, Zap, Users, Wallet } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Digital Marketplace">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
                {/* Header */}
                <header className="border-b border-white/10 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-xl">DigitalMarket</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <>
                                        <Link href={route('products.index')}>
                                            <Button variant="ghost" className="text-white hover:text-purple-300">
                                                Browse Products
                                            </Button>
                                        </Link>
                                        <Link href={route('dashboard')}>
                                            <Button className="bg-purple-600 hover:bg-purple-700">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')}>
                                            <Button variant="ghost" className="text-white hover:text-purple-300">
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button className="bg-purple-600 hover:bg-purple-700">
                                                Get Started
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            🚀 Digital Marketplace
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Buy and sell digital products with cryptocurrency. Secure transactions, instant downloads, and seamless user experience.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {auth.user ? (
                                <Link href={route('products.index')}>
                                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-4">
                                        🛍️ Browse Products
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-4">
                                            🚀 Start Shopping
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-900/50 text-lg px-8 py-4">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">✨ Platform Features</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Download className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">📁 Instant Downloads</h3>
                                <p className="text-gray-300">Get immediate access to your purchased digital products with secure download links.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Wallet className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">💰 Crypto Wallet</h3>
                                <p className="text-gray-300">Secure wallet system with cryptocurrency deposits and escrow protection.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">🛡️ Secure Transactions</h3>
                                <p className="text-gray-300">Protected purchases with warranty periods and escrow for non-downloadable items.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">👥 Referral System</h3>
                                <p className="text-gray-300">Earn commissions by referring new users to the platform.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">⚡ Fast Processing</h3>
                                <p className="text-gray-300">Lightning-fast order processing and automated delivery systems.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <ShoppingCart className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">🛒 Easy Shopping</h3>
                                <p className="text-gray-300">Browse, filter, and purchase digital products with just a few clicks.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Types */}
                <section className="py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">🛍️ Available Products</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-purple-500/20">
                                <h3 className="text-2xl font-bold mb-4">📥 Downloadable Products</h3>
                                <ul className="space-y-2 text-gray-300 mb-6">
                                    <li>• PDF Documents & Ebooks</li>
                                    <li>• Software & Applications</li>
                                    <li>• Media Files (Images, Videos)</li>
                                    <li>• Digital Templates</li>
                                </ul>
                                <p className="text-sm text-purple-300">Instant access upon purchase</p>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-8 border border-cyan-500/20">
                                <h3 className="text-2xl font-bold mb-4">🔑 Non-Downloadable Products</h3>
                                <ul className="space-y-2 text-gray-300 mb-6">
                                    <li>• Account Credentials</li>
                                    <li>• Service Subscriptions</li>
                                    <li>• Digital Keys & Codes</li>
                                    <li>• Access Tokens</li>
                                </ul>
                                <p className="text-sm text-cyan-300">Delivered with warranty protection</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users buying and selling digital products securely.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-4">
                                        🚀 Create Account
                                    </Button>
                                </Link>
                                <Link href={route('login')}>
                                    <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-900/50 text-lg px-8 py-4">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 py-8 px-6">
                    <div className="container mx-auto text-center text-gray-400">
                        <p>&copy; 2024 DigitalMarket. Secure digital commerce platform.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}