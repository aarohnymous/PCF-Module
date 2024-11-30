import React from 'react';
import { Package2, ArrowRight } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function ProductsList() {
  const { products, removeProduct } = useProductStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <Link
          to="/products/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new product.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
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
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
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

              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
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
                  <p className="text-gray-500">Transport</p>
                  <p className="font-medium">
                    {product.transportDistance}km via {product.transportMethod}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}