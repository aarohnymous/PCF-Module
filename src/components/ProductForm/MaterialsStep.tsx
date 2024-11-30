import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { MaterialInput } from '../../types/carbon';
import { materialEmissions } from '../../data/emissionFactors';
import { generateId } from '../../utils/helpers';

interface MaterialsStepProps {
  materials: MaterialInput[];
  onChange: (materials: MaterialInput[]) => void;
}

export default function MaterialsStep({ materials, onChange }: MaterialsStepProps) {
  const addMaterial = () => {
    onChange([
      ...materials,
      {
        id: generateId(),
        name: '',
        material: materialEmissions[0].material,
        weight: 0,
      },
    ]);
  };

  const updateMaterial = (id: string, updates: Partial<MaterialInput>) => {
    onChange(
      materials.map((mat) =>
        mat.id === id ? { ...mat, ...updates } : mat
      )
    );
  };

  const removeMaterial = (id: string) => {
    onChange(materials.filter((mat) => mat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Bill of Materials</h3>
        <button
          type="button"
          onClick={addMaterial}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Material</span>
        </button>
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <div
            key={material.id}
            className="grid grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg"
          >
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={material.name}
                onChange={(e) => updateMaterial(material.id, { name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Material Type
              </label>
              <select
                value={material.material}
                onChange={(e) =>
                  updateMaterial(material.id, { material: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {materialEmissions.map((m) => (
                  <option key={m.material} value={m.material}>
                    {m.material.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                value={material.weight}
                onChange={(e) =>
                  updateMaterial(material.id, {
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
                step="0.001"
                required
              />
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Supplier (optional)
              </label>
              <input
                type="text"
                value={material.supplier || ''}
                onChange={(e) =>
                  updateMaterial(material.id, { supplier: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="col-span-1 pt-7">
              <button
                type="button"
                onClick={() => removeMaterial(material.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}