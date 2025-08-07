import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Key, ShoppingCart } from 'lucide-react';

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
    [key: string]: unknown;
}

interface ProductsPageProps {
    products: {
        data: Product[];
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
    filters: {
        search?: string;
        type?: string;
        min_price?: string;
        max_price?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex() {
    const { products, filters } = usePage<ProductsPageProps>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || 'all');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');

    const handleSearch = () => {
        const searchParams: Record<string, string> = {};
        if (searchTerm) searchParams.search = searchTerm;
        if (selectedType !== 'all') searchParams.type = selectedType;
        if (minPrice) searchParams.min_price = minPrice;
        if (maxPrice) searchParams.max_price = maxPrice;

        router.get(route('products.index'), searchParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedType('all');
        setMinPrice('');
        setMaxPrice('');
        router.get(route('products.index'));
    };

    return (
        <AppShell>
            <Head title="Products" />
            
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">🛍️ Digital Products</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse our collection of digital products and services
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>

                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Product Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="downloadable">Downloadable</SelectItem>
                                <SelectItem value="non_downloadable">Non-Downloadable</SelectItem>
                            </SelectContent>
                        </Select>

                        <Input
                            placeholder="Min Price"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />

                        <Input
                            placeholder="Max Price"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button onClick={handleSearch} className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Apply Filters
                        </Button>
                        <Button variant="outline" onClick={resetFilters}>
                            Clear All
                        </Button>
                    </div>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {products.data.map((product) => (
                                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant={product.type === 'downloadable' ? 'default' : 'secondary'}>
                                                {product.type === 'downloadable' ? (
                                                    <>
                                                        <Download className="h-3 w-3 mr-1" />
                                                        Download
                                                    </>
                                                ) : (
                                                    <>
                                                        <Key className="h-3 w-3 mr-1" />
                                                        Credentials
                                                    </>
                                                )}
                                            </Badge>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-green-600">${product.price}</div>
                                                <div className="text-xs text-gray-500">Stock: {product.stock_quantity}</div>
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
                                    </CardHeader>
                                    
                                    <CardContent className="pb-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                            {product.description}
                                        </p>
                                        {product.warranty_days > 0 && (
                                            <p className="text-xs text-blue-600 mt-2">
                                                🛡️ {product.warranty_days} days warranty
                                            </p>
                                        )}
                                    </CardContent>
                                    
                                    <CardFooter className="pt-3">
                                        <div className="w-full space-y-2">
                                            <Link href={route('products.show', product.id)} className="block">
                                                <Button className="w-full" size="sm">
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.links && (
                            <div className="flex justify-center space-x-2">
                                {products.links.map((link, index) => (
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
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                        <Button onClick={resetFilters} variant="outline">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}