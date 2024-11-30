import React from 'react';
import { Process, EnergyInput as EnergyInputType, FuelInput as FuelInputType } from '../../../types/carbon';
import { generateId } from '../../../utils/helpers';
import EnergyInput from './EnergyInput';
import FuelInput from './FuelInput';

interface ProcessInputsProps {
  process: Process;
  onChange: (updates: Partial<Process>) => void;
  onRemove: () => void;
}

export default function ProcessInputs({
  process,
  onChange,
  onRemove,
}: ProcessInputsProps) {
  const addEnergyInput = () => {
    const newEnergyInput: EnergyInputType = {
      id: generateId(),
      processId: process.id,
      type: 'electricity',
      name: 'Electricity',
      quantity: 0,
      unit: 'kWh',
      emissionFactor: 0.5,
    };
    onChange({
      energyInputs: [...process.energyInputs, newEnergyInput],
    });
  };

  const addFuelInput = () => {
    const newFuelInput: FuelInputType = {
      id: generateId(),
      processId: process.id,
      type: 'diesel',
      name: 'Diesel',
      quantity: 0,
      unit: 'L',
      emissionFactor: 2.68,
    };
    onChange({
      fuelInputs: [...process.fuelInputs, newFuelInput],
    });
  };

  const updateEnergyInput = (id: string, updates: Partial<EnergyInputType>) => {
    onChange({
      energyInputs: process.energyInputs.map(input =>
        input.id === id ? { ...input, ...updates } : input
      ),
    });
  };

  const updateFuelInput = (id: string, updates: Partial<FuelInputType>) => {
    onChange({
      fuelInputs: process.fuelInputs.map(input =>
        input.id === id ? { ...input, ...updates } : input
      ),
    });
  };

  const removeEnergyInput = (id: string) => {
    onChange({
      energyInputs: process.energyInputs.filter(input => input.id !== id),
    });
  };

  const removeFuelInput = (id: string) => {
    onChange({
      fuelInputs: process.fuelInputs.filter(input => input.id !== id),
    });
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Process Name
          </label>
          <input
            type="text"
            value={process.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-800"
        >
          Remove Process
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Energy Inputs</h4>
          <button
            type="button"
            onClick={addEnergyInput}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Add Energy Input
          </button>
        </div>
        {process.energyInputs.map((input) => (
          <EnergyInput
            key={input.id}
            {...input}
            onChange={(updates) => updateEnergyInput(input.id, updates)}
            onRemove={() => removeEnergyInput(input.id)}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Fuel Inputs</h4>
          <button
            type="button"
            onClick={addFuelInput}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Add Fuel Input
          </button>
        </div>
        {process.fuelInputs.map((input) => (
          <FuelInput
            key={input.id}
            {...input}
            onChange={(updates) => updateFuelInput(input.id, updates)}
            onRemove={() => removeFuelInput(input.id)}
          />
        ))}
      </div>
    </div>
  );
}