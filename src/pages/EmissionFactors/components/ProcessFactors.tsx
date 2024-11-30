import React from 'react';
import { useEmissionStore } from '../../../store/emissionStore';

export default function ProcessFactors() {
  const { processes, updateProcessEmission } = useEmissionStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Processes (kg CO₂e/kg)
      </h3>
      
      {processes.map((process) => (
        <div key={process.process} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {process.process.charAt(0).toUpperCase() + process.process.slice(1)}
          </label>
          <input
            type="number"
            value={process.kgCO2PerKg}
            onChange={(e) => updateProcessEmission(
              process.process, 
              parseFloat(e.target.value) || 0
            )}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            step="0.01"
            min="0"
          />
        </div>
      ))}
    </div>
  );
}