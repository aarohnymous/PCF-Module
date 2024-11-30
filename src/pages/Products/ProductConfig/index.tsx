import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProductStore } from '../../../store/productStore';
import { Product } from '../../../types/carbon';
import BasicInfo from './steps/BasicInfo';
import ComponentsConfig from './steps/ComponentsConfig';
import ProcessConfig from './steps/ProcessConfig';
import TransportConfig from './steps/TransportConfig';
import ReviewConfig from './steps/ReviewConfig';

const steps = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'components', title: 'Components' },
  { id: 'processes', title: 'Processes' },
  { id: 'transport', title: 'Transport' },
  { id: 'review', title: 'Review' },
];

export default function ProductConfig() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, updateProduct } = useProductStore();
  const product = id ? products.find(p => p.id === id) : undefined;
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Product>(() => {
    if (product) {
      return { ...product };
    }
    return {
      id: '',
      name: '',
      description: '',
      components: [],
      transportDistance: 0,
      transportMethod: 'truck',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      batches: [],
    };
  });

  const handleSubmit = () => {
    if (id && product) {
      updateProduct(id, formData);
    } else {
      addProduct(formData);
    }
    navigate('/products');
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return (
          <BasicInfo
            data={formData}
            onChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
          />
        );
      case 'components':
        return (
          <ComponentsConfig
            components={formData.components}
            onChange={(components) => setFormData(prev => ({ ...prev, components }))}
          />
        );
      case 'processes':
        return (
          <ProcessConfig
            components={formData.components}
            onChange={(components) => setFormData(prev => ({ ...prev, components }))}
          />
        );
      case 'transport':
        return (
          <TransportConfig
            distance={formData.transportDistance}
            method={formData.transportMethod}
            onChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
          />
        );
      case 'review':
        return <ReviewConfig product={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/products')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${
                  index === currentStep
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{step.title}</span>
                {index < currentStep && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-200" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">{renderStepContent()}</div>

        <div className="border-t border-gray-200 px-8 py-4 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            {currentStep === steps.length - 1 ? 'Save Product' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}