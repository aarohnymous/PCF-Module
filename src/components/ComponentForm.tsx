import React from 'react';
import { Component } from '../types/carbon';
import { materialEmissions, processEmissions } from '../data/emissionFactors';

interface ComponentFormProps {
  component: Component;
  index: number;
  onChange: (index: number, component: Component) => void;
  onRemove: (index: number) => void;
}

export default function ComponentForm({ 
  component, 
  index, 
  onChange, 
  onRemove 
}: ComponentFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedComponent = {
      ...component,
      [name]: name === 'weight' ? parseFloat(value) || 0 : value,
    };
    onChange(index, updatedComponent);
  };

  const handleProcessChange = (process: string) => {
    const updatedProcesses = component.processes.includes(process)
      ? component.processes.filter(p => p !== process)
      : [...component.processes, process];
    
    onChange(index, { ...component, processes: updatedProcesses });
  };

  return (
    <div className="border p-4 rounded-md space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Component {index + 1}</h3>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={component.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Material
          </label>
          <select
            name="material"
            value={component.material}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            {materialEmissions.map((m) => (
              <option key={m.material} value={m.material}>
                {m.material.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={component.weight}
            onChange={handleChange}
            min="0"
            step="0.001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manufacturing Processes
          </label>
          <div className="grid grid-cols-2 gap-2">
            {processEmissions.map((process) => (
              <label key={process.process} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={component.processes.includes(process.process)}
                  onChange={() => handleProcessChange(process.process)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  {process.process.charAt(0).toUpperCase() + process.process.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}