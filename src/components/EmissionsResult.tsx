import React from 'react';
import { Product } from '../types/carbon';
import { calculateTotalEmissions } from '../utils/carbonCalculations';

interface EmissionsResultProps {
  product: Product;
}

export default function EmissionsResult({ product }: EmissionsResultProps) {
  const { componentEmissions, transportEmissions, totalEmissions } = 
    calculateTotalEmissions(product);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Carbon Footprint Results</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Product Details</h3>
          <p className="text-gray-600">Name: {product.name}</p>
          <p className="text-gray-600">
            Total Weight: {product.components.reduce((sum, c) => sum + c.weight, 0).toFixed(2)} kg
          </p>
          <p className="text-gray-600">
            Transport: {product.transportDistance} km by {product.transportMethod}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Component Emissions</h3>
          {componentEmissions.map((comp, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{comp.name}:</span>
              <span className="font-medium">{comp.emissions.toFixed(2)} kg CO₂e</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Transport Emissions:</span>
            <span className="font-medium">{transportEmissions.toFixed(2)} kg CO₂e</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-semibold text-gray-700">Total Emissions:</span>
            <span className="text-lg font-bold text-green-600">
              {totalEmissions.toFixed(2)} kg CO₂e
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}