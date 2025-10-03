import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">CC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Cañón Colorado</h1>
                <p className="text-xs text-blue-200">"Dios es Amor"</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
                </div>
              </div>
              
              <button 
                onClick={logout}
                className="p-2 hover:bg-blue-800 rounded-full transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;