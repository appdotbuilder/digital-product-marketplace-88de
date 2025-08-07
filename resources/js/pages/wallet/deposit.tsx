import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, CreditCard, AlertTriangle } from 'lucide-react';

interface DepositFormData {
    amount: string;
    transaction_id: string;
    proof_image: File | null;
    notes: string;
}

export default function WalletDeposit() {
    const [formData, setFormData] = useState<DepositFormData>({
        amount: '',
        transaction_id: '',
        proof_image: null,
        notes: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof DepositFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            proof_image: file
        }));
        if (errors.proof_image) {
            setErrors(prev => ({ ...prev, proof_image: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors: Record<string, string> = {};
        
        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (parseFloat(formData.amount) < 10) {
            newErrors.amount = 'Minimum deposit is $10';
        } else if (parseFloat(formData.amount) > 10000) {
            newErrors.amount = 'Maximum deposit is $10,000';
        }
        
        if (!formData.transaction_id) {
            newErrors.transaction_id = 'Transaction ID is required';
        }
        
        if (!formData.proof_image) {
            newErrors.proof_image = 'Proof image is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Create FormData for file upload
        const submitData = new FormData();
        submitData.append('amount', formData.amount);
        submitData.append('transaction_id', formData.transaction_id);
        submitData.append('notes', formData.notes);
        if (formData.proof_image) {
            submitData.append('proof_image', formData.proof_image);
        }

        router.post(route('wallet.store'), submitData, {
            onFinish: () => setIsSubmitting(false),
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <AppShell>
            <Head title="Add Funds to Wallet" />
            
            <div className="container mx-auto px-6 py-8 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.visit(route('wallet.index'))}
                        className="mb-4 flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Wallet
                    </Button>
                    
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <CreditCard className="h-8 w-8 text-green-500" />
                        💰 Add Funds
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Deposit cryptocurrency to your wallet balance
                    </p>
                </div>

                {/* Instructions Card */}
                <Card className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                            <AlertTriangle className="h-5 w-5" />
                            Deposit Instructions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                        <p><strong>Step 1:</strong> Send your cryptocurrency to our wallet address</p>
                        <p><strong>Step 2:</strong> Copy the transaction ID from your wallet</p>
                        <p><strong>Step 3:</strong> Take a screenshot of the transaction</p>
                        <p><strong>Step 4:</strong> Fill out the form below with the details</p>
                        <p className="mt-4 p-3 bg-orange-100 dark:bg-orange-800/20 rounded-md">
                            <strong>Wallet Address:</strong><br />
                            <code className="text-xs break-all">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
                        </p>
                    </CardContent>
                </Card>

                {/* Deposit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Deposit Request Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="amount">Deposit Amount (USD) *</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="10"
                                    max="10000"
                                    placeholder="Enter amount (min: $10, max: $10,000)"
                                    value={formData.amount}
                                    onChange={handleInputChange('amount')}
                                    className={`mt-1 ${errors.amount ? 'border-red-500' : ''}`}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="transaction_id">Transaction ID *</Label>
                                <Input
                                    id="transaction_id"
                                    type="text"
                                    placeholder="Paste your transaction ID here"
                                    value={formData.transaction_id}
                                    onChange={handleInputChange('transaction_id')}
                                    className={`mt-1 ${errors.transaction_id ? 'border-red-500' : ''}`}
                                />
                                {errors.transaction_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.transaction_id}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    This can be found in your cryptocurrency wallet after sending the transaction
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="proof_image">Proof of Payment (Screenshot) *</Label>
                                <Input
                                    id="proof_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`mt-1 ${errors.proof_image ? 'border-red-500' : ''}`}
                                />
                                {errors.proof_image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.proof_image}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Upload a screenshot of your transaction (PNG, JPG, max 5MB)
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Any additional information about your deposit..."
                                    value={formData.notes}
                                    onChange={handleInputChange('notes')}
                                    className="mt-1"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Maximum 1000 characters
                                </p>
                            </div>

                            <div className="pt-6 border-t">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        'Submitting...'
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Submit Deposit Request
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-gray-500 mt-2">
                                    Your deposit will be reviewed by an administrator within 24 hours
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}