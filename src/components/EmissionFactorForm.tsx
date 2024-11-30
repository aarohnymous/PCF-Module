import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MaterialEmission, ProcessEmission, TransportEmission } from '../types/carbon';

interface EmissionFactorFormProps {
  type: 'material' | 'process' | 'transport';
  items: MaterialEmission[] | ProcessEmission[] | TransportEmission[];
  onAdd: (item: any) => void;
  onUpdate: (index: number, item: any) => void;
  onRemove: (index: number) => void;
}

export default function EmissionFactorForm({
  type,
  items,
  onAdd,
  onUpdate,
  onRemove,
}: EmissionFactorFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<any>(() => {
    switch (type) {
      case 'material':
        return { material: '', kgCO2PerKg: 0 };
      case 'process':
        return { process: '', kgCO2PerKg: 0 };
      case 'transport':
        return { method: '', kgCO2PerKmPerKg: 0 };
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newItem);
    setNewItem(
      type === 'transport'
        ? { method: '', kgCO2PerKmPerKg: 0 }
        : { [type]: '', kgCO2PerKg: 0 }
    );
    setShowForm(false);
  };

  const renderForm = () => {
    switch (type) {
      case 'material':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material Name
              </label>
              <input
                type="text"
                value={newItem.material}
                onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emission Factor (kg CO₂e/kg)
              </label>
              <input
                type="number"
                value={newItem.kgCO2PerKg}
                onChange={(e) => setNewItem({ ...newItem, kgCO2PerKg: parseFloat(e.target.value) || 0 })}
                step="0.0001"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Add Material
              </button>
            </div>
          </form>
        );

      case 'process':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Process Name
              </label>
              <input
                type="text"
                value={newItem.process}
                onChange={(e) => setNewItem({ ...newItem, process: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emission Factor (kg CO₂e/kg)
              </label>
              <input
                type="number"
                value={newItem.kgCO2PerKg}
                onChange={(e) => setNewItem({ ...newItem, kgCO2PerKg: parseFloat(e.target.value) || 0 })}
                step="0.0001"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Add Process
              </button>
            </div>
          </form>
        );

      case 'transport':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transport Method
              </label>
              <input
                type="text"
                value={newItem.method}
                onChange={(e) => setNewItem({ ...newItem, method: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emission Factor (kg CO₂e/kg/km)
              </label>
              <input
                type="number"
                value={newItem.kgCO2PerKmPerKg}
                onChange={(e) => setNewItem({ ...newItem, kgCO2PerKmPerKg: parseFloat(e.target.value) || 0 })}
                step="0.000001"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Add Transport Method
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {type.charAt(0).toUpperCase() + type.slice(1)} Emission Factors
        </h3>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add {type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg">
          {renderForm()}
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, index) => {
          const key = type === 'transport' ? 'method' : type;
          const value = type === 'transport' ? 'kgCO2PerKmPerKg' : 'kgCO2PerKg';
          
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {(item as any)[key]}
                </p>
                <p className="text-sm text-gray-500">
                  {(item as any)[value]} kg CO₂e{type === 'transport' ? '/kg/km' : '/kg'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}