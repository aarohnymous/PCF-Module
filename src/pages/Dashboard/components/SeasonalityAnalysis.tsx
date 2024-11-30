import React from 'react';
import { Product } from '../../../types/carbon';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface SeasonalityAnalysisProps {
  products: Product[];
}

export default function SeasonalityAnalysis({ products }: SeasonalityAnalysisProps) {
  // Group batches by month
  const monthlyData = products.flatMap(product => 
    product.batches.map(batch => {
      const { totalEmissions } = calculateProductEmissions({ ...product, batches: [batch] });
      return {
        date: new Date(batch.date),
        pcf: totalEmissions / batch.manufacturedQuantity,
        volume: batch.manufacturedQuantity,
        product: product.name
      };
    })
  ).reduce((acc, { date, pcf, volume, product }) => {
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        avgPCF: 0,
        totalVolume: 0,
        count: 0,
        products: new Set()
      };
    }
    acc[monthKey].avgPCF = (acc[monthKey].avgPCF * acc[monthKey].count + pcf) / (acc[monthKey].count + 1);
    acc[monthKey].totalVolume += volume;
    acc[monthKey].count += 1;
    acc[monthKey].products.add(product);
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      avgPCF: data.avgPCF,
      totalVolume: data.totalVolume,
      productCount: data.products.size
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Trends</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Average PCF by Month</h4>
          <LineChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ 
                value: 'kg CO₂e/unit',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 12 }
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(4)} kg CO₂e/unit`, 'Avg PCF']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgPCF" 
              stroke="#0179EF"
              name="Average PCF"
            />
          </LineChart>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Production Volume by Month</h4>
          <LineChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ 
                value: 'Units',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 12 }
              }}
            />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString(), 'Volume']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalVolume" 
              stroke="#10B981"
              name="Production Volume"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}