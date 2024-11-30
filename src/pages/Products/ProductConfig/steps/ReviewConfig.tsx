import React from 'react';
import { Product } from '../../../../types/carbon';
import ProcessFlow from '../../../../components/ProcessFlow';

interface ReviewConfigProps {
  product: Product;
}

export default function ReviewConfig({ product }: ReviewConfigProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
          </div>
          {product.description && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.description}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Components</h3>
        <div className="space-y-4">
          {product.components.map((component) => (
            <div
              key={component.id}
              className="bg-gray-50 p-4 rounded-lg space-y-2"
            >
              <h4 className="font-medium text-gray-900">{component.name}</h4>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">Material</dt>
                  <dd className="font-medium">
                    {component.material.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Weight</dt>
                  <dd className="font-medium">{component.weight} kg</dd>
                </div>
              </dl>

              {component.processes.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Processes
                  </h5>
                  <ul className="space-y-2">
                    {component.processes.map((process) => (
                      <li key={process.id} className="text-sm">
                        <p className="font-medium">{process.name}</p>
                        {process.energyInputs.length > 0 && (
                          <p className="text-gray-500 ml-4">
                            Energy: {process.energyInputs.map(e => 
                              `${e.quantity} ${e.unit} ${e.name}`
                            ).join(', ')}
                          </p>
                        )}
                        {process.fuelInputs.length > 0 && (
                          <p className="text-gray-500 ml-4">
                            Fuel: {process.fuelInputs.map(f => 
                              `${f.quantity} ${f.unit} ${f.name}`
                            ).join(', ')}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Transport</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Distance</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {product.transportDistance} km
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Method</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {product.transportMethod.charAt(0).toUpperCase() + 
               product.transportMethod.slice(1)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Process Flow</h3>
        <ProcessFlow product={product} />
      </div>
    </div>
  );
}