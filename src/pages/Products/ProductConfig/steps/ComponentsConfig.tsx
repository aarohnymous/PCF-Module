import React from 'react';
import { Component } from '../../../../types/carbon';
import { Plus } from 'lucide-react';
import MaterialInput from '../../../../components/forms/product/MaterialInput';
import { generateId } from '../../../../utils/helpers';

interface ComponentsConfigProps {
  components: Component[];
  onChange: (components: Component[]) => void;
}

export default function ComponentsConfig({ components, onChange }: ComponentsConfigProps) {
  const addComponent = () => {
    const newComponent: Component = {
      id: generateId(),
      name: '',
      material: 'aluminum_foil',
      weight: 0,
      processes: []
    };
    onChange([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    onChange(
      components.map(comp =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const removeComponent = (id: string) => {
    onChange(components.filter(comp => comp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Components</h3>
        <button
          type="button"
          onClick={addComponent}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Component</span>
        </button>
      </div>

      <div className="space-y-4">
        {components.map((component) => (
          <MaterialInput
            key={component.id}
            name={component.name}
            material={component.material}
            weight={component.weight}
            onChange={(updates) => updateComponent(component.id, updates)}
            onRemove={() => removeComponent(component.id)}
          />
        ))}

        {components.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              Add your first component to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}