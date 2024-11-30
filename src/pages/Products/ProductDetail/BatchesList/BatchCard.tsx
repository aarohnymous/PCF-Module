import React from 'react';
import { Batch } from '../../../../types/carbon';
import { formatDate } from '../../../../utils/helpers';
import { calculateTotalEmissions } from '../../../../utils/carbonCalculations';
import { Edit2, Trash2 } from 'lucide-react';

interface BatchCardProps {
  batch: Batch;
  onEdit: (batchId: string) => void;
  onDelete: (batchId: string) => void;
}

export default function BatchCard({ batch, onEdit, onDelete }: BatchCardProps) {
  const { totalEmissions } = calculateTotalEmissions(batch);
  const perUnitEmissions = totalEmissions / batch.manufacturedQuantity;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            Batch #{batch.batchNumber}
          </h4>
          <p className="text-sm text-gray-500">{formatDate(batch.date)}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(batch.id)}
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
            title="Edit Batch"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(batch.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Batch"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Manufactured Quantity</p>
          <p className="font-medium">{batch.manufacturedQuantity.toLocaleString()} units</p>
        </div>
        <div>
          <p className="text-gray-500">Transport</p>
          <p className="font-medium">
            {batch.transportDistance}km via {batch.transportMethod}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Total Emissions</p>
          <p className="font-medium">{totalEmissions.toFixed(2)} kg CO₂e</p>
        </div>
        <div>
          <p className="text-gray-500">Per Unit Emissions</p>
          <p className="font-medium">{perUnitEmissions.toFixed(4)} kg CO₂e/unit</p>
        </div>
      </div>

      {batch.notes && (
        <p className="mt-4 text-sm text-gray-600">
          Notes: {batch.notes}
        </p>
      )}
    </div>
  );
}