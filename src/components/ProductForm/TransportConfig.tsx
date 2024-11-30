import React from 'react';
import { TransportConfig as TransportConfigType } from '../../types/carbon';
import { transportEmissions } from '../../data/emissionFactors';

interface TransportConfigProps {
  config: TransportConfigType;
  onChange: (config: TransportConfigType) => void;
}

export default function TransportConfig({ config, onChange }: TransportConfigProps) {
  const handleChange = (updates: Partial<TransportConfigType>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Transport Configuration</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport Distance (km)
          </label>
          <input
            type="number"
            value={config.distance}
            onChange={(e) => handleChange({ distance: parseFloat(e.target.value) || 0 })}
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
            value={config.method}
            onChange={(e) => handleChange({ method: e.target.value as TransportConfigType['method'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {transportEmissions.map((t) => (
              <option key={t.method} value={t.method}>
                {t.method.charAt(0).toUpperCase() + t.method.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Load Factor (%)
          </label>
          <input
            type="number"
            value={config.loadFactor || ''}
            onChange={(e) => handleChange({ loadFactor: parseFloat(e.target.value) || undefined })}
            min="0"
            max="100"
            step="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="returnEmpty"
            checked={config.returnEmpty || false}
            onChange={(e) => handleChange({ returnEmpty: e.target.checked })}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="returnEmpty" className="text-sm font-medium text-gray-700">
            Return Empty
          </label>
        </div>
      </div>
    </div>
  );
}