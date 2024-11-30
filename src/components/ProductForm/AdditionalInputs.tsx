import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdditionalInput } from '../../types/carbon';
import { generateId } from '../../utils/helpers';

interface AdditionalInputsProps {
  inputs: AdditionalInput[];
  onChange: (inputs: AdditionalInput[]) => void;
}

export default function AdditionalInputs({ inputs, onChange }: AdditionalInputsProps) {
  const addInput = () => {
    onChange([
      ...inputs,
      {
        id: generateId(),
        name: '',
        type: '',
        unit: '',
        emissionFactor: 0,
        quantity: 0,
      },
    ]);
  };

  const updateInput = (id: string, updates: Partial<AdditionalInput>) => {
    onChange(
      inputs.map((input) =>
        input.id === id ? { ...input, ...updates } : input
      )
    );
  };

  const removeInput = (id: string) => {
    onChange(inputs.filter((input) => input.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Additional Inputs</h3>
        <button
          type="button"
          onClick={addInput}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Input</span>
        </button>
      </div>

      <div className="space-y-4">
        {inputs.map((input) => (
          <div
            key={input.id}
            className="grid grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg"
          >
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={input.name}
                onChange={(e) => updateInput(input.id, { name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                value={input.type}
                onChange={(e) => updateInput(input.id, { type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <input
                type="text"
                value={input.unit}
                onChange={(e) => updateInput(input.id, { unit: e.target.value })}
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
                  updateInput(input.id, {
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
                  updateInput(input.id, {
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
                onClick={() => removeInput(input.id)}
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