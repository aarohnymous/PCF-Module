import React from 'react';
import { Component } from '../../../types/carbon';

interface BatchMaterialInputProps {
  component: Component;
  actualWeight: number;
  onChange: (weight: number) => void;
}

export default function BatchMaterialInput({
  component,
  actualWeight,
  onChange,
}: BatchMaterialInputProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {component.name}
        </label>
        <p className="text-sm text-gray-500">
          {component.material.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </p>
        <p className="text-sm text-gray-500">
          Reference: {component.weight} kg
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Actual Weight (kg)
        </label>
        <input
          type="number"
          value={actualWeight}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step="0.001"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>
    </div>
  );
}