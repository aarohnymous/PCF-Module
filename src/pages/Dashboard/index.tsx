import React from 'react';
import { useProductStore } from '../../store/productStore';
import DashboardMetrics from './components/DashboardMetrics';
import AnomalyDetection from './components/AnomalyDetection';
import SeasonalityAnalysis from './components/SeasonalityAnalysis';
import ProductsComparison from './components/ProductsComparison';

export default function Dashboard() {
  const { products } = useProductStore();

  return (
    <div className="space-y-8">
      <DashboardMetrics products={products} />
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-8">
          <AnomalyDetection products={products} />
          <ProductsComparison products={products} />
        </div>
        <SeasonalityAnalysis products={products} />
      </div>
    </div>
  );
}