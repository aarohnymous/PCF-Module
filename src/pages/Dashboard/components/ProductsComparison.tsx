import React from 'react';
import { Product } from '../../../types/carbon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';

interface ProductsComparisonProps {
  products: Product[];
}

export default function ProductsComparison({ products }: ProductsComparisonProps) {
  const comparisonData = products.map(product => {
    const { averagePerUnitEmissions } = calculateProductEmissions(product);
    return {
      name: product.name,
      pcf: averagePerUnitEmissions
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Product PCF Comparison</h2>
      <BarChart width={600} height={300} data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'kg CO₂e/unit', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value: number) => [`${value.toFixed(4)} kg CO₂e/unit`, 'PCF']} />
        <Legend />
        <Bar 
          dataKey="pcf" 
          fill="#0179EF" 
          name="Average PCF"
        />
      </BarChart>
    </div>
  );
}