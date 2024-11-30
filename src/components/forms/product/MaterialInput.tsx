import React from 'react';
import { materialEmissions } from '../../../data/emissionFactors';

interface MaterialInputProps {
  name: string;
  material: string;
  weight: number;
  onChange: (updates: { name?: string; material?: string; weight?: number }) => void;
  onRemove: () => void;
}

export default function MaterialInput({
  name,
  material,
  weight,
  onChange,
  onRemove,
}: MaterialInputProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Material Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Material Type
        </label>
        <select
          value={material}
          onChange={(e) => onChange({ material: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {materialEmissions.map((m) => (
            <option key={m.material} value={m.material}>
              {m.material.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weight (kg)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => onChange({ weight: parseFloat(e.target.value) || 0 })}
            step="0.001"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
          <button
            type="button"
            onClick={onRemove}
            className="mt-1 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}