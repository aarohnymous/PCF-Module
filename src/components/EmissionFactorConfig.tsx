import React from 'react';
import { useEmissionStore } from '../store/emissionStore';

export default function EmissionFactorConfig() {
  const { 
    materials, 
    processes, 
    transport, 
    updateMaterialEmission,
    updateProcessEmission,
    updateTransportEmission,
    resetToDefaults 
  } = useEmissionStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Emission Factors Configuration</h2>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Materials (kg CO₂e/kg)</h3>
          {materials.map((material) => (
            <div key={material.material} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {material.material.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </label>
              <input
                type="number"
                value={material.kgCO2PerKg}
                onChange={(e) => updateMaterialEmission(
                  material.material, 
                  parseFloat(e.target.value) || 0
                )}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                step="0.01"
                min="0"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Processes (kg CO₂e/kg)</h3>
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                step="0.01"
                min="0"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Transport (kg CO₂e/kg/km)</h3>
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                step="0.000001"
                min="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}