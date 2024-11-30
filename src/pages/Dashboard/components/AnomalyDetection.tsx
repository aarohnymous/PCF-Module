import React from 'react';
import { Product, Batch } from '../../../types/carbon';
import { calculateProductEmissions } from '../../../utils/carbonCalculations';
import { AlertTriangle } from 'lucide-react';

interface AnomalyDetectionProps {
  products: Product[];
}

export default function AnomalyDetection({ products }: AnomalyDetectionProps) {
  const detectAnomalies = (batches: Batch[], threshold = 2) => {
    if (batches.length < 2) return [];

    const emissions = batches.map(batch => {
      const { totalEmissions } = calculateProductEmissions({ ...products[0], batches: [batch] });
      return {
        batch,
        pcf: totalEmissions / batch.manufacturedQuantity
      };
    });

    // Calculate mean and standard deviation
    const pcfs = emissions.map(e => e.pcf);
    const mean = pcfs.reduce((sum, pcf) => sum + pcf, 0) / pcfs.length;
    const variance = pcfs.reduce((sum, pcf) => sum + Math.pow(pcf - mean, 2), 0) / pcfs.length;
    const stdDev = Math.sqrt(variance);

    // Detect anomalies (values outside threshold * standard deviation)
    return emissions.filter(({ pcf }) => 
      Math.abs(pcf - mean) > threshold * stdDev
    ).map(({ batch, pcf }) => ({
      batch,
      pcf,
      deviation: ((pcf - mean) / mean) * 100
    }));
  };

  const allAnomalies = products.flatMap(product => 
    detectAnomalies(product.batches).map(anomaly => ({
      ...anomaly,
      productName: product.name
    }))
  );

  if (allAnomalies.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Anomaly Detection</h3>
      </div>

      <div className="space-y-4">
        {allAnomalies.map((anomaly, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100"
          >
            <div>
              <p className="font-medium text-gray-900">
                {anomaly.productName} - Batch #{anomaly.batch.batchNumber}
              </p>
              <p className="text-sm text-gray-600">
                PCF: {anomaly.pcf.toFixed(2)} kg CO₂e/unit
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-yellow-600">
                {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation.toFixed(1)}% deviation
              </p>
              <p className="text-xs text-gray-500">
                {new Date(anomaly.batch.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}