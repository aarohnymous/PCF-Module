import React from 'react';
import { Package2 } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <Package2 className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new product
      </p>
    </div>
  );
}