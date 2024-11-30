import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { useProductStore } from '../../../store/productStore';
import BatchesList from './BatchesList';
import ProductSummary from '../../../components/ProductSummary';
import ProcessFlow from '../../../components/ProcessFlow';
import { Batch } from '../../../types/carbon';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addBatch, updateBatch, removeBatch } = useProductStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-primary-600 hover:text-primary-800"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddBatch = (batchData: Omit<Batch, 'id'>) => {
    if (id) {
      addBatch(id, batchData);
    }
  };

  const handleUpdateBatch = (batchId: string, batchData: Omit<Batch, 'id'>) => {
    if (id) {
      updateBatch(id, batchId, batchData);
    }
  };

  const handleDeleteBatch = (batchId: string) => {
    if (id) {
      removeBatch(id, batchId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">
              {product.components.length} components
            </p>
          </div>
        </div>
        <Link
          to={`/products/${id}/config`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Settings className="h-5 w-5" />
          <span>Edit Configuration</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <ProcessFlow product={product} />
          <BatchesList
            product={product}
            onAddBatch={handleAddBatch}
            onUpdateBatch={handleUpdateBatch}
            onDeleteBatch={handleDeleteBatch}
          />
        </div>
        <div>
          <ProductSummary batches={product.batches} />
        </div>
      </div>
    </div>
  );
}