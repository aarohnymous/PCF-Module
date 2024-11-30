import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package2,
  Settings
} from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products', icon: Package2 },
    { to: '/emission-factors', label: 'Emission Factors', icon: Settings },
  ];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}