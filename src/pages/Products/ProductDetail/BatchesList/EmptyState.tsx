import React from 'react';
import { ClipboardList } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No batches</h3>
      <p className="mt-1 text-sm text-gray-500">
        Add your first production batch to start tracking PCF variations
      </p>
    </div>
  );
}