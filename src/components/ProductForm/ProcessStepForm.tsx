import React from 'react';
import { ProcessStep } from '../../types/carbon';
import { ArrowUp, ArrowDown, X, Plus } from 'lucide-react';
import { generateId } from '../../utils/helpers';
import { materialEmissions, processEmissions } from '../../data/emissionFactors';

interface ProcessStepFormProps {
  step: ProcessStep;
  onUpdate: (step: ProcessStep) => void;
  onRemove: () => void;
  onMove: (direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  isFlattened: boolean;
}

export default function ProcessStepForm({
  step,
  onUpdate,
  onRemove,
  onMove,
  isFirst,
  isLast,
  isFlattened,
}: ProcessStepFormProps) {
  const addMaterial = () => {
    onUpdate({
      ...step,
      materials: [
        ...step.materials,
        {
          id: generateId(),
          material: materialEmissions[0].material,
          weight: 0,
        },
      ],
    });
  };

  const updateMaterial = (
    materialId: string,
    updates: Partial<ProcessStep['materials'][0]>
  ) => {
    onUpdate({
      ...step,
      materials: step.materials.map((mat) =>
        mat.id === materialId ? { ...mat, ...updates } : mat
      ),
    });
  };

  const removeMaterial = (materialId: string) => {
    onUpdate({
      ...step,
      materials: step.materials.filter((mat) => mat.id !== materialId),
    });
  };

  const toggleProcess = (process: string) => {
    onUpdate({
      ...step,
      processes: step.processes.includes(process)
        ? step.processes.filter((p) => p !== process)
        : [...step.processes, process],
    });
  };

  const addEnergyInput = () => {
    onUpdate({
      ...step,
      energyInputs: [
        ...step.energyInputs,
        {
          id: generateId(),
          type: 'electricity',
          name: 'Electricity',
          unit: 'kWh',
          emissionFactor: 0.5,
          quantity: 0,
        },
      ],
    });
  };

  const updateEnergyInput = (
    inputId: string,
    updates: Partial<ProcessStep['energyInputs'][0]>
  ) => {
    onUpdate({
      ...step,
      energyInputs: step.energyInputs.map((input) =>
        input.id === inputId ? { ...input, ...updates } : input
      ),
    });
  };

  const removeEnergyInput = (inputId: string) => {
    onUpdate({
      ...step,
      energyInputs: step.energyInputs.filter((input) => input.id !== inputId),
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={step.name}
            onChange={(e) => onUpdate({ ...step, name: e.target.value })}
            placeholder="Step Name"
            className="text-lg font-medium text-gray-900 border-none focus:ring-0 p-0 w-full"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          {!isFlattened && (
            <>
              <button
                type="button"
                onClick={() => onMove('up')}
                disabled={isFirst}
                className={`p-1 rounded hover:bg-gray-100 ${
                  isFirst ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove('down')}
                disabled={isLast}
                className={`p-1 rounded hover:bg-gray-100 ${
                  isLast ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onRemove}
            className="p-1 rounded hover:bg-gray-100 text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Materials Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">Materials</h3>
            <button
              type="button"
              onClick={addMaterial}
              className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Material</span>
            </button>
          </div>
          <div className="space-y-4">
            {step.materials.map((material) => (
              <div key={material.id} className="flex items-center space-x-4">
                <select
                  value={material.material}
                  onChange={(e) =>
                    updateMaterial(material.id, { material: e.target.value })
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {materialEmissions.map((m) => (
                    <option key={m.material} value={m.material}>
                      {m.material.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={material.weight}
                  onChange={(e) =>
                    updateMaterial(material.id, {
                      weight: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Weight (kg)"
                  className="w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                  step="0.001"
                />
                <button
                  type="button"
                  onClick={() => removeMaterial(material.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Processes Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Processes</h3>
          <div className="grid grid-cols-2 gap-4">
            {processEmissions.map((process) => (
              <label
                key={process.process}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={step.processes.includes(process.process)}
                  onChange={() => toggleProcess(process.process)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  {process.process.charAt(0).toUpperCase() +
                    process.process.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Energy Inputs Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">Energy Inputs</h3>
            <button
              type="button"
              onClick={addEnergyInput}
              className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Energy Input</span>
            </button>
          </div>
          <div className="space-y-4">
            {step.energyInputs.map((input) => (
              <div key={input.id} className="grid grid-cols-5 gap-4">
                <select
                  value={input.type}
                  onChange={(e) =>
                    updateEnergyInput(input.id, {
                      type: e.target.value as ProcessStep['energyInputs'][0]['type'],
                      name: e.target.value === 'custom' ? '' : e.target.value,
                    })
                  }
                  className="col-span-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="electricity">Electricity</option>
                  <option value="natural_gas">Natural Gas</option>
                  <option value="diesel">Diesel</option>
                  <option value="custom">Custom</option>
                </select>
                {input.type === 'custom' && (
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) =>
                      updateEnergyInput(input.id, { name: e.target.value })
                    }
                    placeholder="Name"
                    className="col-span-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                )}
                <input
                  type="text"
                  value={input.unit}
                  onChange={(e) =>
                    updateEnergyInput(input.id, { unit: e.target.value })
                  }
                  placeholder="Unit"
                  className="col-span-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="number"
                  value={input.emissionFactor}
                  onChange={(e) =>
                    updateEnergyInput(input.id, {
                      emissionFactor: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Emission Factor"
                  className="col-span-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                  step="0.0001"
                />
                <div className="col-span-1 flex items-center space-x-2">
                  <input
                    type="number"
                    value={input.quantity}
                    onChange={(e) =>
                      updateEnergyInput(input.id, {
                        quantity: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Quantity"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    min="0"
                    step="0.01"
                  />
                  <button
                    type="button"
                    onClick={() => removeEnergyInput(input.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}