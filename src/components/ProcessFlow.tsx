import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types/carbon';

interface ProcessFlowProps {
  product: Product;
}

export default function ProcessFlow({ product }: ProcessFlowProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Process Flow</h3>
      
      <div className="flex flex-wrap items-center gap-4">
        {product.components.map((component, index) => (
          <React.Fragment key={component.id}>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800">{component.name}</h4>
              <p className="text-sm text-green-600">
                {component.material.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </p>
              <p className="text-sm text-green-600">{component.weight} kg</p>
            </div>
            
            {component.processes.length > 0 && (
              <>
                <ArrowRight className="text-gray-400" />
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800">Processes</h4>
                  <ul className="text-sm text-blue-600 space-y-2">
                    {component.processes.map((process) => (
                      <li key={process.id}>
                        <div className="font-medium">{process.name}</div>
                        {process.energyInputs.length > 0 && (
                          <div className="ml-2 text-xs">
                            Energy: {process.energyInputs.map(e => `${e.quantity} ${e.unit}`).join(', ')}
                          </div>
                        )}
                        {process.fuelInputs.length > 0 && (
                          <div className="ml-2 text-xs">
                            Fuel: {process.fuelInputs.map(f => `${f.quantity} ${f.unit}`).join(', ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            {index < product.components.length - 1 && (
              <ArrowRight className="text-gray-400" />
            )}
          </React.Fragment>
        ))}
        
        <ArrowRight className="text-gray-400" />
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-800">Transport</h4>
          <p className="text-sm text-purple-600">
            {product.transportMethod.charAt(0).toUpperCase() + 
             product.transportMethod.slice(1)}
          </p>
          <p className="text-sm text-purple-600">{product.transportDistance} km</p>
        </div>
      </div>
    </div>
  );
}