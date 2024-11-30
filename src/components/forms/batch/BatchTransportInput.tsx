import React from 'react';
import { TransportMethod } from '../../../types/carbon';
import { transportEmissions } from '../../../data/emissionFactors';

interface BatchTransportInputProps {
  distance: number;
  method: TransportMethod;
  referenceDistance: number;
  referenceMethod: TransportMethod;
  onChange: (updates: { distance?: number; method?: TransportMethod }) => void;
}

export default function BatchTransportInput({
  distance,
  method,
  referenceDistance,
  referenceMethod,
  onChange,
}: BatchTransportInputProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Transport Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport Distance (km)
          </label>
          <div className="mt-1 space-y-1">
            <input
              type="number"
              value={distance}
              onChange={(e) => onChange({ distance: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
            <p className="text-sm text-gray-500">
              Reference: {referenceDistance} km
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport Method
          </label>
          <div className="mt-1 space-y-1">
            <select
              value={method}
              onChange={(e) => onChange({ method: e.target.value as TransportMethod })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {transportEmissions.map((t) => (
                <option key={t.method} value={t.method}>
                  {t.method.charAt(0).toUpperCase() + t.method.slice(1)}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">
              Reference: {referenceMethod.charAt(0).toUpperCase() + referenceMethod.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}