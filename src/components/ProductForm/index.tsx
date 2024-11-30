import React, { useState } from 'react';
import { Product } from '../../types/carbon';
import BasicInfo from './BasicInfo';
import ProcessMap from './ProcessMap';
import MaterialsStep from './MaterialsStep';
import ProcessStep from './ProcessStep';
import EnergyInputs from './EnergyInputs';
import AdditionalInputs from './AdditionalInputs';
import TransportConfig from './TransportConfig';
import { generateId } from '../../utils/helpers';

interface ProductFormProps {
  onSubmit: (productData: Omit<Product, 'id' | 'batches' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [productData, setProductData] = useState<Omit<Product, 'id' | 'batches' | 'createdAt' | 'updatedAt'>>(() => {
    if (initialData) {
      const { id, batches, createdAt, updatedAt, ...rest } = initialData;
      return rest;
    }
    return {
      code: '',
      name: '',
      description: '',
      category: '',
      tags: [],
      steps: [],
      transport: {
        distance: 0,
        method: 'truck',
      },
    };
  });

  const steps = [
    { title: 'Basic Information', component: BasicInfo },
    { title: 'Process Map', component: ProcessMap },
    { title: 'Materials', component: MaterialsStep },
    { title: 'Processes', component: ProcessStep },
    { title: 'Energy', component: EnergyInputs },
    { title: 'Additional Inputs', component: AdditionalInputs },
    { title: 'Transport', component: TransportConfig },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productData);
  };

  const handleStepChange = (updates: any) => {
    setProductData(prev => ({ ...prev, ...updates }));
  };

  const addProductionStep = () => {
    const newStep = {
      id: generateId(),
      name: '',
      order: productData.steps.length,
      materials: [],
      processes: [],
      energyInputs: [],
      additionalInputs: [],
    };
    setProductData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  };

  const updateProductionStep = (stepId: string, updates: any) => {
    setProductData(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    }));
  };

  const removeProductionStep = (stepId: string) => {
    setProductData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId),
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <nav className="flex justify-between items-center">
        <div className="flex space-x-4">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentStep === index
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <CurrentStepComponent
          data={productData}
          onChange={handleStepChange}
          steps={productData.steps}
          onAddStep={addProductionStep}
          onUpdateStep={updateProductionStep}
          onRemoveStep={removeProductionStep}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Save Product
          </button>
        )}
      </div>
    </form>
  );
}