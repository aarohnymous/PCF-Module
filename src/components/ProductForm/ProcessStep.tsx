import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ProcessInput } from '../../types/carbon';
import { processEmissions } from '../../data/emissionFactors';
import { generateId } from '../../utils/helpers';

interface ProcessStepProps {
  processes: ProcessInput[];
  onChange: (processes: ProcessInput[]) => void;
}

export default function ProcessStep({ processes, onChange }: ProcessStepProps) {
  const addProcess = () => {
    onChange([
      ...processes,
      {
        id: generateId(),
        name: '',
        processes: [],
        description: '',
      },
    ]);
  };

  const updateProcess = (id: string, updates: Partial<ProcessInput>) => {
    onChange(
      processes.map((proc) =>
        proc.id === id ? { ...proc, ...updates } : proc
      )
    );
  };

  const removeProcess = (id: string) => {
    onChange(processes.filter((proc) => proc.id !== id));
  };

  const toggleProcessType = (processId: string, processType: string) => {
    const process = processes.find((p) => p.id === processId);
    if (!process) return;

    const updatedProcesses = process.processes.includes(processType)
      ? process.processes.filter((p) => p !== processType)
      : [...process.processes, processType];

    updateProcess(processId, { processes: updatedProcesses });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Process Steps</h3>
        <button
          type="button"
          onClick={addProcess}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Process</span>
        </button>
      </div>

      <div className="space-y-4">
        {processes.map((process) => (
          <div
            key={process.id}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <input
                  type="text"
                  value={process.name}
                  onChange={(e) =>
                    updateProcess(process.id, { name: e.target.value })
                  }
                  placeholder="Process Name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeProcess(process.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Process Types
              </label>
              <div className="grid grid-cols-3 gap-4">
                {processEmissions.map((proc) => (
                  <label
                    key={proc.process}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={process.processes.includes(proc.process)}
                      onChange={() => toggleProcessType(process.id, proc.process)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {proc.process.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description (optional)
              </label>
              <textarea
                value={process.description || ''}
                onChange={(e) =>
                  updateProcess(process.id, { description: e.target.value })
                }
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}