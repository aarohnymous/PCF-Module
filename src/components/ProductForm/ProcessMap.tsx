import React from 'react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { ProductionStep } from '../../types/carbon';

interface ProcessMapProps {
  steps: ProductionStep[];
  onAddStep: () => void;
  onUpdateStep: (stepId: string, updates: Partial<ProductionStep>) => void;
  onRemoveStep: (stepId: string) => void;
}

export default function ProcessMap({
  steps,
  onAddStep,
  onUpdateStep,
  onRemoveStep,
}: ProcessMapProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Process Flow Map</h3>
        <button
          type="button"
          onClick={onAddStep}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Step</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative group">
              <div className="bg-white p-4 rounded-lg border-2 border-primary-200 group-hover:border-primary-400 transition-colors">
                <input
                  type="text"
                  value={step.name}
                  onChange={(e) =>
                    onUpdateStep(step.id, { name: e.target.value })
                  }
                  className="block w-full text-center font-medium text-gray-900 border-none focus:ring-0"
                  placeholder="Step Name"
                />
                <div className="mt-2 text-sm text-gray-500">
                  {step.materials.length > 0 && (
                    <p>{step.materials.length} Materials</p>
                  )}
                  {step.processes.length > 0 && (
                    <p>{step.processes.length} Processes</p>
                  )}
                  {step.energyInputs.length > 0 && (
                    <p>{step.energyInputs.length} Energy Inputs</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveStep(step.id)}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full border border-gray-200 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-6 w-6 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      {steps.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">
            Add your first process step to create the flow map
          </p>
        </div>
      )}
    </div>
  );
}