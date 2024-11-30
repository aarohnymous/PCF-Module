import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../../../types/carbon';
import { useProductStore } from '../../../store/productStore';
import { formatDate } from '../../../utils/helpers';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { removeProduct } = useProductStore();
  const { averagePerUnitEmissions } = calculateProductEmissions(product);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {product.batches.length} batches
            </span>
          </div>
          
          {product.description && (
            <p className="mt-1 text-sm text-gray-500">
              {product.description}
            </p>
          )}
          
          <div className="mt-2 text-sm text-gray-500">
            Created {formatDate(product.createdAt)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => removeProduct(product.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Product"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Components</p>
          <p className="font-medium">{product.components.length}</p>
        </div>
        <div>
          <p className="text-gray-500">Latest Batch</p>
          <p className="font-medium">
            {product.batches.length > 0
              ? formatDate(product.batches[product.batches.length - 1].date)
              : 'No batches'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Average PCF</p>
          <p className="font-medium">
            {averagePerUnitEmissions.toFixed(4)} kg CO₂e/unit
          </p>
        </div>
        <div>
          <p className="text-gray-500">Transport</p>
          <p className="font-medium">
            {product.transportDistance}km via {product.transportMethod}
          </p>
        </div>
      </div>
    </div>
  );
}