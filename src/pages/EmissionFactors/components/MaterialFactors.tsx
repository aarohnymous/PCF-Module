import React from 'react';
import { useEmissionStore } from '../../../store/emissionStore';

export default function MaterialFactors() {
  const { materials, updateMaterialEmission } = useEmissionStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Materials (kg CO₂e/kg)
      </h3>
      
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
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            step="0.01"
            min="0"
          />
        </div>
      ))}
    </div>
  );
}