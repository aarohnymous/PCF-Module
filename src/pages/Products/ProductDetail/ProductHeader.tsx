import React from 'react';
import { Product } from '../../../types/carbon';
import { formatDate } from '../../../utils/helpers';

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <div className="flex items-center space-x-4 mt-1">
        <p className="text-sm text-gray-500">
          Created {formatDate(product.createdAt)}
        </p>
        <span className="text-gray-300">•</span>
        <p className="text-sm text-gray-500">
          {product.batches.length} {product.batches.length === 1 ? 'batch' : 'batches'}
        </p>
      </div>
    </div>
  );
}