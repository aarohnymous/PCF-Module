import React from 'react';
import { Product } from '../../../types/carbon';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ProductMetricsProps {
  product: Product;
}

export default function ProductMetrics({ product }: ProductMetricsProps) {
  const { batchEmissions, averagePerUnitEmissions, totalManufactured } = 
    calculateProductEmissions(product);

  const chartData = batchEmissions.map(batch => ({
    date: new Date(batch.date).getTime(),
    pcf: batch.perUnitEmissions
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Metrics</h3>
        
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-gray-500">Average PCF</p>
            <p className="text-2xl font-bold text-primary-600">
              {averagePerUnitEmissions.toFixed(4)} kg CO₂e/unit
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Total Production</p>
            <p className="text-2xl font-bold text-primary-600">
              {totalManufactured.toLocaleString()} units
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">PCF Trend</h3>
        <LineChart width={300} height={200} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={timestamp => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={timestamp => new Date(timestamp).toLocaleDateString()}
            formatter={(value: number) => [`${value.toFixed(4)} kg CO₂e/unit`, 'PCF']}
          />
          <Line 
            type="monotone" 
            dataKey="pcf" 
            stroke="#0179EF" 
            dot={true}
          />
        </LineChart>
      </div>
    </div>
  );
}