import React from 'react';
import { ProcessStep } from '../../types/carbon';
import ProcessStepForm from './ProcessStepForm';
import { generateId } from '../../utils/helpers';
import { Switch } from '../ui/Switch';

interface ProcessStepListProps {
  steps: ProcessStep[];
  isFlattened: boolean;
  onChange: (steps: ProcessStep[], isFlattened: boolean) => void;
}

export default function ProcessStepList({
  steps,
  isFlattened,
  onChange,
}: ProcessStepListProps) {
  const addStep = () => {
    const newStep: ProcessStep = {
      id: generateId(),
      name: '',
      materials: [],
      processes: [],
      energyInputs: [],
    };
    onChange([...steps, newStep], isFlattened);
  };

  const updateStep = (index: number, updatedStep: ProcessStep) => {
    const newSteps = [...steps];
    newSteps[index] = updatedStep;
    onChange(newSteps, isFlattened);
  };

  const removeStep = (index: number) => {
    onChange(steps.filter((_, i) => i !== index), isFlattened);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onChange(newSteps, isFlattened);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Process Steps</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isFlattened}
              onCheckedChange={(checked) => onChange(steps, checked)}
              id="flatten-steps"
            />
            <label
              htmlFor="flatten-steps"
              className="text-sm font-medium text-gray-700"
            >
              Flatten Steps
            </label>
          </div>
          <button
            type="button"
            onClick={addStep}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Add Step
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <ProcessStepForm
            key={step.id}
            step={step}
            onUpdate={(updatedStep) => updateStep(index, updatedStep)}
            onRemove={() => removeStep(index)}
            onMove={(direction) => moveStep(index, direction)}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
            isFlattened={isFlattened}
          />
        ))}
      </div>
    </div>
  );
}