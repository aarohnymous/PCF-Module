import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EnergyInput, EnergyType } from '../../types/carbon';
import { generateId } from '../../utils/helpers';

interface EnergyInputsProps {
  energyInputs: EnergyInput[];
  onChange: (energyInputs: EnergyInput[]) => void;
}

export default function EnergyInputs({ energyInputs, onChange }: EnergyInputsProps) {
  const energyTypes: { value: EnergyType; label: string }[] = [
    { value: 'electricity', label: 'Electricity' },
    { value: 'natural_gas', label: 'Natural Gas' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'custom', label: 'Custom' },
  ];

  const addEnergyInput = () => {
    onChange([
      ...energyInputs,
      {
        id: generateId(),
        type: 'electricity',
        name: 'Electricity',
        unit: 'kWh',
        emissionFactor: 0.5,
        quantity: 0,
      },
    ]);
  };

  const updateEnergyInput = (id: string, updates: Partial<EnergyInput>) => {
    onChange(
      energyInputs.map((input) =>
        input.id === id ? { ...input, ...updates } : input
      )
    );
  };

  const removeEnergyInput = (id: string) => {
    onChange(energyInputs.filter((input) => input.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Energy Inputs</h3>
        <button
          type="button"
          onClick={addEnergyInput}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Energy Input</span>
        </button>
      </div>

      <div className="space-y-4">
        {energyInputs.map((input) => (
          <div
            key={input.id}
            className="grid grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg"
          >
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={input.type}
                onChange={(e) => {
                  const type = e.target.value as EnergyType;
                  updateEnergyInput(input.id, {
                    type,
                    name: type === 'custom' ? '' : type,
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {energyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {input.type === 'custom' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) =>
                    updateEnergyInput(input.id, { name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <input
                type="text"
                value={input.unit}
                onChange={(e) =>
                  updateEnergyInput(input.id, { unit: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Emission Factor
              </label>
              <input
                type="number"
                value={input.emissionFactor}
                onChange={(e) =>
                  updateEnergyInput(input.id, {
                    emissionFactor: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.0001"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={input.quantity}
                onChange={(e) =>
                  updateEnergyInput(input.id, {
                    quantity: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-1 pt-7">
              <button
                type="button"
                onClick={() => removeEnergyInput(input.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}