import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useProductStore } from '../store/productStore';
import { calculateTotalEmissions } from '../utils/carbonCalculations';

export default function ProductComparison() {
  const { products, removeProduct } = useProductStore();

  const comparisonData = products.map(product => {
    const { componentEmissions, transportEmissions, totalEmissions } = 
      calculateTotalEmissions(product);
    
    return {
      name: product.name,
      components: componentEmissions.reduce((sum, comp) => sum + comp.emissions, 0),
      transport: transportEmissions,
      total: totalEmissions
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
      </div>

      {products.length > 0 ? (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Emissions Comparison
            </h3>
            <BarChart width={1200} height={400} data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="components" 
                fill="#047857" 
                name="Component Emissions" 
              />
              <Bar 
                dataKey="transport" 
                fill="#10B981" 
                name="Transport Emissions" 
              />
              <Bar 
                dataKey="total" 
                fill="#34D399" 
                name="Total Emissions" 
              />
            </BarChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Saved Products
            </h3>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Components: {product.components.length} | 
                      Transport: {product.transportDistance}km via {product.transportMethod}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products saved yet. Use the calculator to add products for comparison.
          </p>
        </div>
      )}
    </div>
  );
}