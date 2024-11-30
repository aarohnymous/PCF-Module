import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import EmissionFactors from './pages/EmissionFactors';
import ProductsList from './pages/Products/ProductsList';
import ProductDetail from './pages/Products/ProductDetail';
import ProductConfig from './pages/Products/ProductConfig';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Navigation />
        
        <main className="flex-1 p-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Leaf className="h-10 w-10 text-primary-500" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Product Carbon Footprint Calculator
                </h1>
              </div>
            </div>
            
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/new/config" element={<ProductConfig />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/:id/config" element={<ProductConfig />} />
              <Route path="/emission-factors" element={<EmissionFactors />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}