import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, FlaskRound as Flask, Users, FileText, BarChart3, ChevronRight } from 'lucide-react';

const menuItems = [
  {
    to: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    color: 'text-blue-600'
  },
  {
    to: '/carros-cubiles',
    icon: Truck,
    label: 'Carros Cubiles',
    color: 'text-green-600'
  },
  {
    to: '/insumos-quimicos',
    icon: Flask,
    label: 'Insumos Químicos',
    color: 'text-purple-600'
  },
  {
    to: '/asistencia',
    icon: Users,
    label: 'Asistencia',
    color: 'text-orange-600'
  },
  {
    to: '/facturacion',
    icon: FileText,
    label: 'Facturación',
    color: 'text-red-600'
  },
  {
    to: '/reportes',
    icon: BarChart3,
    label: 'Reportes',
    color: 'text-indigo-600'
  }
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white shadow-lg border-r">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between p-3 rounded-lg transition-all duration-200 group hover:bg-gray-50 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
                    : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;