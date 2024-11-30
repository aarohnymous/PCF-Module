import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useProductStore } from '../../../store/productStore';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

export default function ProductsList() {
  const { products } = useProductStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <Link
          to="/products/new/config"
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>New Product</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}