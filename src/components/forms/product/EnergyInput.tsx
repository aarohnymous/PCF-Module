import React from 'react';
import { EnergyType } from '../../../types/carbon';

interface EnergyInputProps {
  type: EnergyType;
  name: string;
  quantity: number;
  unit: string;
  emissionFactor: number;
  onChange: (updates: {
    type?: EnergyType;
    name?: string;
    quantity?: number;
    unit?: string;
    emissionFactor?: number;
  }) => void;
  onRemove: () => void;
}

export default function EnergyInput({
  type,
  name,
  quantity,
  unit,
  emissionFactor,
  onChange,
  onRemove,
}: EnergyInputProps) {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Energy Type
        </label>
        <select
          value={type}
          onChange={(e) => onChange({ type: e.target.value as EnergyType })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="electricity">Electricity</option>
          <option value="natural_gas">Natural Gas</option>
          <option value="diesel">Diesel</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {type === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => onChange({ quantity: parseFloat(e.target.value) || 0 })}
          step="0.01"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Unit
        </label>
        <input
          type="text"
          value={unit}
          onChange={(e) => onChange({ unit: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Emission Factor (kg CO₂e/unit)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={emissionFactor}
            onChange={(e) => onChange({ emissionFactor: parseFloat(e.target.value) || 0 })}
            step="0.0001"
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