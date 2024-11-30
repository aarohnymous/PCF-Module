import React from 'react';
import { Batch } from '../types/carbon';
import { formatDate } from '../utils/helpers';
import { calculateTotalEmissions } from '../utils/carbonCalculations';

interface BatchListProps {
  batches: Batch[];
  onEditBatch: (batchId: string) => void;
  onDeleteBatch: (batchId: string) => void;
}

export default function BatchList({ 
  batches, 
  onEditBatch, 
  onDeleteBatch 
}: BatchListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Production Batches</h3>
      
      {batches.length === 0 ? (
        <p className="text-gray-500 italic">No batches recorded yet.</p>
      ) : (
        <div className="grid gap-4">
          {batches.map((batch) => {
            const { totalEmissions } = calculateTotalEmissions(batch);
            const perUnitEmissions = totalEmissions / batch.manufacturedQuantity;
            
            return (
              <div 
                key={batch.id} 
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Batch #{batch.batchNumber}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(batch.date)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditBatch(batch.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteBatch(batch.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Manufactured Quantity:</p>
                    <p className="font-medium">{batch.manufacturedQuantity} units</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transport:</p>
                    <p className="font-medium">
                      {batch.transportDistance}km via {batch.transportMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Emissions:</p>
                    <p className="font-medium">{totalEmissions.toFixed(2)} kg CO₂e</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Per Unit Emissions:</p>
                    <p className="font-medium">
                      {perUnitEmissions.toFixed(4)} kg CO₂e/unit
                    </p>
                  </div>
                </div>
                
                {batch.notes && (
                  <p className="mt-2 text-sm text-gray-600">
                    Notes: {batch.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}