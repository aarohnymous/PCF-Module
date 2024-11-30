import React from 'react';
import { useEmissionStore } from '../../store/emissionStore';
import EmissionFactorForm from '../../components/EmissionFactorForm';

export default function EmissionFactors() {
  const {
    materials,
    processes,
    transport,
    addMaterialEmission,
    addProcessEmission,
    addTransportEmission,
    updateMaterialEmission,
    updateProcessEmission,
    updateTransportEmission,
    removeMaterialEmission,
    removeProcessEmission,
    removeTransportEmission,
    resetToDefaults,
  } = useEmissionStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Emission Factors</h2>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <EmissionFactorForm
          type="material"
          items={materials}
          onAdd={addMaterialEmission}
          onUpdate={(index, item) => updateMaterialEmission(item.material, item.kgCO2PerKg)}
          onRemove={removeMaterialEmission}
        />

        <EmissionFactorForm
          type="process"
          items={processes}
          onAdd={addProcessEmission}
          onUpdate={(index, item) => updateProcessEmission(item.process, item.kgCO2PerKg)}
          onRemove={removeProcessEmission}
        />

        <EmissionFactorForm
          type="transport"
          items={transport}
          onAdd={addTransportEmission}
          onUpdate={(index, item) => updateTransportEmission(item.method, item.kgCO2PerKmPerKg)}
          onRemove={removeTransportEmission}
        />
      </div>
    </div>
  );
}