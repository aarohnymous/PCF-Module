import React from 'react';
import { Batch } from '../types/carbon';
import { calculateProductSummary } from '../utils/carbonCalculations';
import { formatDate } from '../utils/helpers';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface ProductSummaryProps {
  batches: Batch[];
}

export default function ProductSummary({ batches }: ProductSummaryProps) {
  const summary = calculateProductSummary(batches);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">PCF Summary</h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Average PCF</p>
          <p className="text-2xl font-bold text-primary-600">
            {summary.averagePCF.toFixed(4)} kg CO₂e/unit
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Production</p>
          <p className="text-2xl font-bold text-primary-600">
            {summary.totalProduction.toLocaleString()} units
          </p>
        </div>
      </div>

      {batches.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">PCF Trend</h4>
          <BarChart
            width={300}
            height={200}
            data={summary.batchEmissions}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="batchNumber"
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
              formatter={(value: number) => [`${value.toFixed(4)} kg CO₂e/unit`, 'PCF']}
            />
            <Bar dataKey="pcf" fill="#0179EF" name="PCF" />
          </BarChart>
        </div>
      )}

      {batches.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Batches</h4>
          <div className="space-y-2">
            {summary.batchEmissions.slice(-3).reverse().map((batch) => (
              <div 
                key={batch.batchId}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-medium">Batch #{batch.batchNumber}</p>
                  <p className="text-gray-500">{formatDate(batch.date)}</p>
                </div>
                <p className="font-medium text-primary-600">
                  {batch.pcf.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}