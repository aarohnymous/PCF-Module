import React from 'react';
import { Component } from '../../../../types/carbon';
import { Plus } from 'lucide-react';
import ProcessInputs from '../../../../components/forms/product/ProcessInputs';
import { generateId } from '../../../../utils/helpers';

interface ProcessConfigProps {
  components: Component[];
  onChange: (components: Component[]) => void;
}

export default function ProcessConfig({ components, onChange }: ProcessConfigProps) {
  const addProcess = (componentId: string) => {
    onChange(
      components.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              processes: [
                ...comp.processes,
                {
                  id: generateId(),
                  name: '',
                  energyInputs: [],
                  fuelInputs: []
                }
              ]
            }
          : comp
      )
    );
  };

  const updateProcess = (componentId: string, processId: string, updates: any) => {
    onChange(
      components.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              processes: comp.processes.map(proc =>
                proc.id === processId ? { ...proc, ...updates } : proc
              )
            }
          : comp
      )
    );
  };

  const removeProcess = (componentId: string, processId: string) => {
    onChange(
      components.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              processes: comp.processes.filter(proc => proc.id !== processId)
            }
          : comp
      )
    );
  };

  return (
    <div className="space-y-8">
      {components.map((component) => (
        <div key={component.id} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {component.name} Processes
            </h3>
            <button
              type="button"
              onClick={() => addProcess(component.id)}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Process</span>
            </button>
          </div>

          <div className="space-y-4">
            {component.processes.map((process) => (
              <ProcessInputs
                key={process.id}
                process={process}
                onChange={(updates) => updateProcess(component.id, process.id, updates)}
                onRemove={() => removeProcess(component.id, process.id)}
              />
            ))}

            {component.processes.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500">
                  Add processes for {component.name}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}