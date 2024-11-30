import React from 'react';
import { useEmissionStore } from '../../../store/emissionStore';

export default function TransportFactors() {
  const { transport, updateTransportEmission } = useEmissionStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Transport (kg CO₂e/kg/km)
      </h3>
      
      {transport.map((t) => (
        <div key={t.method} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.method.charAt(0).toUpperCase() + t.method.slice(1)}
          </label>
          <input
            type="number"
            value={t.kgCO2PerKmPerKg}
            onChange={(e) => updateTransportEmission(
              t.method, 
              parseFloat(e.target.value) || 0
            )}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            step="0.000001"
            min="0"
          />
        </div>
      ))}
    </div>
  );
}