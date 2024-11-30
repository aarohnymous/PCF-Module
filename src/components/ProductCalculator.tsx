import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import { Product } from '../types/carbon';
import ComponentForm from './ComponentForm';
import ProcessFlow from './ProcessFlow';
import EmissionsResult from './EmissionsResult';

const initialProduct: Product = {
  name: '',
  components: [
    {
      name: '',
      material: 'aluminum_foil',
      weight: 0,
      processes: [],
    },
  ],
  transportDistance: 0,
  transportMethod: 'truck',
};

export default function ProductCalculator() {
  const [product, setProduct] = useState<Product>(initialProduct);
  const { addProduct } = useProductStore();
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.components.length > 0) {
      addProduct(product);
      setShowResults(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'transportDistance' ? parseFloat(value) || 0 : value,
    }));
  };

  const addComponent = () => {
    setProduct((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          name: '',
          material: 'aluminum_foil',
          weight: 0,
          processes: [],
        },
      ],
    }));
  };

  const updateComponent = (index: number, updatedComponent: Product['components'][0]) => {
    setProduct((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? updatedComponent : comp
      ),
    }));
  };

  const removeComponent = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Components</h2>
            <button
              type="button"
              onClick={addComponent}
              className="text-sm bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600"
            >
              Add Component
            </button>
          </div>

          {product.components.map((component, index) => (
            <ComponentForm
              key={index}
              component={component}
              index={index}
              onChange={updateComponent}
              onRemove={removeComponent}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Distance (km)
            </label>
            <input
              type="number"
              name="transportDistance"
              value={product.transportDistance}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Method
            </label>
            <select
              name="transportMethod"
              value={product.transportMethod}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="truck">Truck</option>
              <option value="ship">Ship</option>
              <option value="air">Air</option>
              <option value="rail">Rail</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Calculate Carbon Footprint
        </button>
      </form>

      {showResults && (
        <div className="space-y-6">
          <ProcessFlow product={product} />
          <EmissionsResult product={product} />
        </div>
      )}
    </div>
  );
}