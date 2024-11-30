import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useProductStore } from '../store/productStore';
import { calculateTotalEmissions } from '../utils/carbonCalculations';

const COLORS = ['#0179EF', '#339cff', '#66b5ff', '#99ceff', '#cce7ff'];

export default function Dashboard() {
  const { products } = useProductStore();
  
  const productEmissions = products.map(product => {
    const { componentEmissions, transportEmissions, totalEmissions } = 
      calculateTotalEmissions(product);
    
    return {
      name: product.name,
      components: componentEmissions.reduce((sum, comp) => sum + comp.emissions, 0),
      transport: transportEmissions,
      total: totalEmissions
    };
  });

  const emissionsByType = products.reduce((acc, product) => {
    const { componentEmissions } = calculateTotalEmissions(product);
    componentEmissions.forEach(comp => {
      acc[comp.name] = (acc[comp.name] || 0) + comp.emissions;
    });
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(emissionsByType).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Emissions by Product
          </h3>
          <BarChart width={600} height={400} data={productEmissions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="components" fill="#0179EF" name="Components" />
            <Bar dataKey="transport" fill="#339cff" name="Transport" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Emissions by Component Type
          </h3>
          <PieChart width={600} height={400}>
            <Pie
              data={pieData}
              cx={300}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => 
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}