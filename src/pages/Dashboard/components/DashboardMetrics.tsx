import React from 'react';
import { Product } from '../../../types/carbon';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface DashboardMetricsProps {
  products: Product[];
}

export default function DashboardMetrics({ products }: DashboardMetricsProps) {
  const totalProducts = products.length;
  const totalBatches = products.reduce((sum, p) => sum + p.batches.length, 0);
  
  const productEmissions = products.map(p => calculateProductEmissions(p));
  const averagePCF = productEmissions.reduce(
    (sum, p) => sum + p.averagePerUnitEmissions, 
    0
  ) / (products.length || 1);

  // Calculate month-over-month change
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthBatches = products.flatMap(p => 
    p.batches.filter(b => {
      const date = new Date(b.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
  );

  const lastMonthBatches = products.flatMap(p => 
    p.batches.filter(b => {
      const date = new Date(b.date);
      return date.getMonth() === (currentMonth - 1) && date.getFullYear() === currentYear;
    })
  );

  const thisMonthAvgPCF = thisMonthBatches.length > 0
    ? thisMonthBatches.reduce((sum, b) => sum + (calculateProductEmissions({ ...products[0], batches: [b] }).averagePerUnitEmissions), 0) / thisMonthBatches.length
    : 0;

  const lastMonthAvgPCF = lastMonthBatches.length > 0
    ? lastMonthBatches.reduce((sum, b) => sum + (calculateProductEmissions({ ...products[0], batches: [b] }).averagePerUnitEmissions), 0) / lastMonthBatches.length
    : 0;

  const pcfChange = lastMonthAvgPCF ? ((thisMonthAvgPCF - lastMonthAvgPCF) / lastMonthAvgPCF) * 100 : 0;

  // Calculate production volume trends
  const thisMonthVolume = thisMonthBatches.reduce((sum, b) => sum + b.manufacturedQuantity, 0);
  const lastMonthVolume = lastMonthBatches.reduce((sum, b) => sum + b.manufacturedQuantity, 0);
  const volumeChange = lastMonthVolume ? ((thisMonthVolume - lastMonthVolume) / lastMonthVolume) * 100 : 0;

  const metrics = [
    {
      label: 'Total Products',
      value: totalProducts,
      subtext: `${totalBatches} total batches`,
    },
    {
      label: 'Average PCF',
      value: `${averagePCF.toFixed(2)} kg CO₂e/unit`,
      change: pcfChange,
      changeLabel: 'vs last month',
      inverse: true, // negative change is good for PCF
    },
    {
      label: 'Production Volume',
      value: thisMonthVolume.toLocaleString(),
      change: volumeChange,
      changeLabel: 'vs last month',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-medium text-gray-500">{metric.label}</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">
            {metric.value}
          </p>
          {metric.subtext && (
            <p className="mt-1 text-sm text-gray-500">{metric.subtext}</p>
          )}
          {typeof metric.change === 'number' && (
            <div className={`mt-2 flex items-center text-sm ${
              (metric.inverse ? -metric.change : metric.change) >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {metric.change >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(metric.change).toFixed(1)}% {metric.changeLabel}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}