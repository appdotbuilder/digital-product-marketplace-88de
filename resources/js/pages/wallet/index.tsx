import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, ArrowUpDown, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface WalletData {
    id: number;
    balance: number;
    escrow_balance: number;
}

interface Transaction {
    id: number;
    type: string;
    status: string;
    amount: number;
    notes: string | null;
    created_at: string;
}

interface WalletPageProps {
    wallet: WalletData;
    transactions: {
        data: Transaction[];
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
    referralEarnings: number;
    [key: string]: unknown;
}

export default function WalletIndex() {
    const { wallet, transactions, referralEarnings } = usePage<WalletPageProps>().props;

    const availableBalance = wallet.balance - wallet.escrow_balance;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'deposit':
                return '💰';
            case 'withdrawal':
                return '💸';
            case 'purchase':
                return '🛒';
            case 'refund':
                return '↩️';
            case 'commission':
                return '💎';
            default:
                return '📋';
        }
    };

    return (
        <AppShell>
            <Head title="My Wallet" />
            
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Wallet className="h-8 w-8 text-blue-500" />
                            💰 My Wallet
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your wallet balance and transactions
                        </p>
                    </div>
                    
                    <Link href={route('wallet.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Funds
                        </Button>
                    </Link>
                </div>

                {/* Wallet Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Available Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                ${availableBalance.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Ready to spend</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Escrow Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                ${wallet.escrow_balance.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Held for orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                ${wallet.balance.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Including escrow</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                Referral Earnings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                ${referralEarnings.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">All-time earnings</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Transactions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowUpDown className="h-5 w-5" />
                            📊 Recent Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.data.length > 0 ? (
                            <div className="space-y-4">
                                {transactions.data.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-gray-50/50 dark:bg-gray-800/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">
                                                {getTypeIcon(transaction.type)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium capitalize">
                                                        {transaction.type.replace('_', ' ')}
                                                    </span>
                                                    <Badge className={getStatusColor(transaction.status)}>
                                                        {getStatusIcon(transaction.status)}
                                                        <span className="ml-1 capitalize">{transaction.status}</span>
                                                    </Badge>
                                                </div>
                                                {transaction.notes && (
                                                    <p className="text-sm text-gray-500">
                                                        {transaction.notes}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400">
                                                    {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className={`font-bold ${
                                                ['deposit', 'refund', 'commission'].includes(transaction.type)
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}>
                                                {['deposit', 'refund', 'commission'].includes(transaction.type) ? '+' : '-'}
                                                ${Math.abs(transaction.amount).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                {transactions.links && (
                                    <div className="flex justify-center space-x-2 mt-6">
                                        {transactions.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    preserveState
                                                    className={`px-3 py-2 rounded-md text-sm ${
                                                        link.active 
                                                            ? 'bg-blue-500 text-white' 
                                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-400"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">💳</div>
                                <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                                <p className="text-gray-500 mb-4">
                                    Your transaction history will appear here
                                </p>
                                <Link href={route('wallet.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Deposit
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}