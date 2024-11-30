import React from 'react';
import { Product } from '../../../types/carbon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';

interface PCFTrendsProps {
  products: Product[];
}

export default function PCFTrends({ products }: PCFTrendsProps) {
  const trendData = products.flatMap(product => {
    const { batchEmissions } = calculateProductEmissions(product);
    return batchEmissions.map(batch => ({
      date: new Date(batch.date).getTime(),
      productName: product.name,
      pcf: batch.perUnitEmissions
    }));
  }).sort((a, b) => a.date - b.date);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">PCF Trends</h2>
      <LineChart width={600} height={300} data={trendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={timestamp => new Date(timestamp).toLocaleDateString()}
        />
        <YAxis label={{ value: 'kg CO₂e/unit', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          labelFormatter={timestamp => new Date(timestamp).toLocaleDateString()}
          formatter={(value: number) => [`${value.toFixed(4)} kg CO₂e/unit`, 'PCF']}
        />
        <Legend />
        {products.map((product, index) => (
          <Line
            key={product.id}
            type="monotone"
            dataKey="pcf"
            data={trendData.filter(d => d.productName === product.name)}
            name={product.name}
            stroke={`hsl(${(index * 137.508) % 360}, 70%, 50%)`}
            dot={true}
          />
        ))}
      </LineChart>
    </div>
  );
}