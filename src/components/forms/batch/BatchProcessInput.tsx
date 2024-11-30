import React from 'react';
import { Component } from '../../../types/carbon';

interface BatchProcessInputProps {
  component: Component;
  selectedProcesses: string[];
  onChange: (processes: string[]) => void;
}

export default function BatchProcessInput({
  component,
  selectedProcesses,
  onChange,
}: BatchProcessInputProps) {
  const toggleProcess = (process: string) => {
    const updatedProcesses = selectedProcesses.includes(process)
      ? selectedProcesses.filter(p => p !== process)
      : [...selectedProcesses, process];
    onChange(updatedProcesses);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {component.name} - Processes
      </label>
      <div className="grid grid-cols-2 gap-4">
        {component.processes.map((process) => (
          <label key={process} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedProcesses.includes(process)}
              onChange={() => toggleProcess(process)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              {process.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}