import React, { useState } from 'react';
import { Product, Batch, BatchComponent } from '../types/carbon';
import { generateId } from '../utils/helpers';
import BatchMaterialInput from './forms/batch/BatchMaterialInput';
import BatchProcessInput from './forms/batch/BatchProcessInput';
import BatchTransportInput from './forms/batch/BatchTransportInput';

interface BatchFormProps {
  product: Product;
  onSubmit: (batchData: Omit<Batch, 'id'>) => void;
  initialData?: Batch;
}

export default function BatchForm({ product, onSubmit, initialData }: BatchFormProps) {
  const [batchData, setBatchData] = useState<Omit<Batch, 'id'>>(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      return rest;
    }
    return {
      batchNumber: '',
      date: new Date().toISOString().split('T')[0],
      components: product.components.map(comp => ({
        ...comp,
        actualWeight: comp.weight,
        processes: comp.processes.map(proc => ({
          ...proc,
          energyInputs: proc.energyInputs.map(energy => ({
            ...energy,
            quantity: energy.quantity,
          })),
          fuelInputs: proc.fuelInputs.map(fuel => ({
            ...fuel,
            quantity: fuel.quantity,
          })),
        })),
      })),
      transportDistance: product.transportDistance,
      transportMethod: product.transportMethod,
      manufacturedQuantity: 0,
      notes: '',
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(batchData);
  };

  const updateComponent = (index: number, updates: Partial<BatchComponent>) => {
    setBatchData(prev => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? { ...comp, ...updates } : comp
      ),
    }));
  };

  const updateComponentProcess = (
    componentIndex: number,
    processIndex: number,
    updates: Partial<BatchComponent['processes'][0]>
  ) => {
    setBatchData(prev => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? {
              ...comp,
              processes: comp.processes.map((proc, j) =>
                j === processIndex ? { ...proc, ...updates } : proc
              ),
            }
          : comp
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Batch Number
          </label>
          <input
            type="text"
            value={batchData.batchNumber}
            onChange={(e) =>
              setBatchData(prev => ({ ...prev, batchNumber: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Production Date
          </label>
          <input
            type="date"
            value={batchData.date}
            onChange={(e) =>
              setBatchData(prev => ({ ...prev, date: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Components</h3>
        {batchData.components.map((component, index) => (
          <div key={component.id} className="space-y-4">
            <BatchMaterialInput
              component={product.components[index]}
              actualWeight={component.actualWeight}
              onChange={(weight) =>
                updateComponent(index, { actualWeight: weight })
              }
            />

            <div className="space-y-4 ml-6">
              {component.processes.map((process, processIndex) => (
                <div key={process.id} className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    {process.name}
                  </h4>

                  {process.energyInputs.map((energy, energyIndex) => (
                    <div key={energy.id} className="ml-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {energy.name} ({energy.unit})
                      </label>
                      <input
                        type="number"
                        value={energy.quantity}
                        onChange={(e) => {
                          const newEnergyInputs = [...process.energyInputs];
                          newEnergyInputs[energyIndex] = {
                            ...energy,
                            quantity: parseFloat(e.target.value) || 0,
                          };
                          updateComponentProcess(index, processIndex, {
                            energyInputs: newEnergyInputs,
                          });
                        }}
                        step="0.01"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  ))}

                  {process.fuelInputs.map((fuel, fuelIndex) => (
                    <div key={fuel.id} className="ml-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {fuel.name} ({fuel.unit})
                      </label>
                      <input
                        type="number"
                        value={fuel.quantity}
                        onChange={(e) => {
                          const newFuelInputs = [...process.fuelInputs];
                          newFuelInputs[fuelIndex] = {
                            ...fuel,
                            quantity: parseFloat(e.target.value) || 0,
                          };
                          updateComponentProcess(index, processIndex, {
                            fuelInputs: newFuelInputs,
                          });
                        }}
                        step="0.01"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BatchTransportInput
        distance={batchData.transportDistance}
        method={batchData.transportMethod}
        referenceDistance={product.transportDistance}
        referenceMethod={product.transportMethod}
        onChange={(updates) => setBatchData(prev => ({ ...prev, ...updates }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Manufactured Quantity (units)
        </label>
        <input
          type="number"
          value={batchData.manufacturedQuantity}
          onChange={(e) =>
            setBatchData(prev => ({
              ...prev,
              manufacturedQuantity: parseInt(e.target.value) || 0,
            }))
          }
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes (optional)
        </label>
        <textarea
          value={batchData.notes}
          onChange={(e) =>
            setBatchData(prev => ({ ...prev, notes: e.target.value }))
          }
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Batch' : 'Add Batch'}
      </button>
    </form>
  );
}