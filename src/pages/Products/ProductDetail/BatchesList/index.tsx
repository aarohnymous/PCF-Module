import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Product, Batch } from '../../../../types/carbon';
import BatchCard from './BatchCard';
import EmptyState from './EmptyState';
import BatchForm from '../../../../components/BatchForm';

interface BatchesListProps {
  product: Product;
  onAddBatch: (batchData: Omit<Batch, 'id'>) => void;
  onUpdateBatch: (batchId: string, batchData: Omit<Batch, 'id'>) => void;
  onDeleteBatch: (batchId: string) => void;
}

export default function BatchesList({
  product,
  onAddBatch,
  onUpdateBatch,
  onDeleteBatch,
}: BatchesListProps) {
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<string | null>(null);

  const handleSubmit = (batchData: Omit<Batch, 'id'>) => {
    if (editingBatch) {
      onUpdateBatch(editingBatch, batchData);
      setEditingBatch(null);
    } else {
      onAddBatch(batchData);
    }
    setShowBatchForm(false);
  };

  const handleEdit = (batchId: string) => {
    setEditingBatch(batchId);
    setShowBatchForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Production Batches</h2>
        <button
          onClick={() => setShowBatchForm(true)}
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Batch</span>
        </button>
      </div>

      {showBatchForm ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingBatch ? 'Edit Batch' : 'New Batch'}
          </h3>
          <BatchForm
            product={product}
            onSubmit={handleSubmit}
            initialData={
              editingBatch
                ? product.batches.find(b => b.id === editingBatch)
                : undefined
            }
          />
        </div>
      ) : product.batches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {product.batches.map((batch) => (
            <BatchCard
              key={batch.id}
              batch={batch}
              onEdit={handleEdit}
              onDelete={onDeleteBatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}