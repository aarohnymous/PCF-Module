import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import BatchList from './BatchList';
import BatchForm from './BatchForm';
import { formatDate } from '../utils/helpers';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct, addBatch, updateBatch, removeBatch } = useProductStore();
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<string | null>(null);

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

  const handleBatchSubmit = (batchData: any) => {
    if (editingBatch) {
      updateBatch(product.id, editingBatch, batchData);
      setEditingBatch(null);
    } else {
      addBatch(product.id, batchData);
    }
    setShowBatchForm(false);
  };

  const handleEditBatch = (batchId: string) => {
    setEditingBatch(batchId);
    setShowBatchForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/products')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">
              Created {formatDate(product.createdAt)}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowBatchForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {showBatchForm ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingBatch ? 'Edit Batch' : 'New Batch'}
              </h2>
              <BatchForm
                productComponents={product.components}
                onSubmit={handleBatchSubmit}
                initialData={
                  editingBatch
                    ? product.batches.find(b => b.id === editingBatch)
                    : undefined
                }
              />
            </div>
          ) : (
            <BatchList
              batches={product.batches}
              onEditBatch={handleEditBatch}
              onDeleteBatch={(batchId) => removeBatch(product.id, batchId)}
            />
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Details
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Components</dt>
                <dd className="mt-1">
                  <ul className="divide-y divide-gray-200">
                    {product.components.map((component) => (
                      <li key={component.id} className="py-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {component.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {component.weight}kg
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {component.material.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </p>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Transport</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {product.transportDistance}km via {product.transportMethod}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}