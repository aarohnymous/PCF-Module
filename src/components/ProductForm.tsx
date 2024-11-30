import React, { useState } from 'react';
import { Product, Component, Process, EnergyInput, FuelInput } from '../types/carbon';
import { generateId } from '../utils/helpers';
import MaterialInput from './forms/product/MaterialInput';
import ProcessInputs from './forms/product/ProcessInputs';
import TransportInput from './forms/product/TransportInput';
import { defaultEnergyEmissionFactors, defaultFuelEmissionFactors } from '../data/defaultEmissionFactors';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const [product, setProduct] = useState<Product>(() => {
    if (initialData) {
      return { ...initialData };
    }
    return {
      id: generateId(),
      name: '',
      description: '',
      components: [],
      transportDistance: 0,
      transportMethod: 'truck',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      batches: [],
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  const addComponent = () => {
    const newComponent: Component = {
      id: generateId(),
      name: '',
      material: 'aluminum_foil',
      weight: 0,
      processes: [],
    };
    setProduct(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setProduct(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    }));
  };

  const removeComponent = (id: string) => {
    setProduct(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id),
    }));
  };

  const addProcess = (componentId: string) => {
    const defaultEnergyInput: EnergyInput = {
      id: generateId(),
      type: 'electricity',
      name: 'Electricity',
      quantity: 0,
      unit: 'kWh',
      emissionFactor: defaultEnergyEmissionFactors.electricity,
    };

    const defaultFuelInput: FuelInput = {
      id: generateId(),
      type: 'diesel',
      name: 'Diesel',
      quantity: 0,
      unit: 'L',
      emissionFactor: defaultFuelEmissionFactors.diesel,
    };

    const newProcess: Process = {
      id: generateId(),
      name: '',
      energyInputs: [defaultEnergyInput],
      fuelInputs: [defaultFuelInput],
    };

    setProduct(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId
          ? { ...comp, processes: [...comp.processes, newProcess] }
          : comp
      ),
    }));
  };

  const updateProcess = (componentId: string, processId: string, updates: Partial<Process>) => {
    setProduct(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              processes: comp.processes.map(proc =>
                proc.id === processId ? { ...proc, ...updates } : proc
              ),
            }
          : comp
      ),
    }));
  };

  const removeProcess = (componentId: string, processId: string) => {
    setProduct(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              processes: comp.processes.filter(proc => proc.id !== processId),
            }
          : comp
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Components</h2>
          <button
            type="button"
            onClick={addComponent}
            className="text-sm bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600"
          >
            Add Component
          </button>
        </div>

        {product.components.map((component) => (
          <div key={component.id} className="space-y-6">
            <MaterialInput
              name={component.name}
              material={component.material}
              weight={component.weight}
              onChange={(updates) => updateComponent(component.id, updates)}
              onRemove={() => removeComponent(component.id)}
            />

            <div className="ml-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Processes</h3>
                <button
                  type="button"
                  onClick={() => addProcess(component.id)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Add Process
                </button>
              </div>

              {component.processes.map((process) => (
                <ProcessInputs
                  key={process.id}
                  process={process}
                  onChange={(updates) => updateProcess(component.id, process.id, updates)}
                  onRemove={() => removeProcess(component.id, process.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TransportInput
        distance={product.transportDistance}
        method={product.transportMethod}
        onChange={(updates) => setProduct(prev => ({ ...prev, ...updates }))}
      />

      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}