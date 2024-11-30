import React from 'react';
import { processEmissions } from '../../../data/emissionFactors';

interface ProcessInputProps {
  selectedProcesses: string[];
  onChange: (processes: string[]) => void;
}

export default function ProcessInput({
  selectedProcesses,
  onChange,
}: ProcessInputProps) {
  const toggleProcess = (process: string) => {
    const updatedProcesses = selectedProcesses.includes(process)
      ? selectedProcesses.filter(p => p !== process)
      : [...selectedProcesses, process];
    onChange(updatedProcesses);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Manufacturing Processes
      </label>
      <div className="grid grid-cols-2 gap-4">
        {processEmissions.map((process) => (
          <label key={process.process} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedProcesses.includes(process.process)}
              onChange={() => toggleProcess(process.process)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              {process.process.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}