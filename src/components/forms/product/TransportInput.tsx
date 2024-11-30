import React from 'react';
import { TransportMethod } from '../../../types/carbon';
import { transportEmissions } from '../../../data/emissionFactors';

interface TransportInputProps {
  distance: number;
  method: TransportMethod;
  onChange: (updates: { distance?: number; method?: TransportMethod }) => void;
}

export default function TransportInput({
  distance,
  method,
  onChange,
}: TransportInputProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Transport Configuration</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport Distance (km)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => onChange({ distance: parseFloat(e.target.value) || 0 })}
            min="0"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport Method
          </label>
          <select
            value={method}
            onChange={(e) => onChange({ method: e.target.value as TransportMethod })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {transportEmissions.map((t) => (
              <option key={t.method} value={t.method}>
                {t.method.charAt(0).toUpperCase() + t.method.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}