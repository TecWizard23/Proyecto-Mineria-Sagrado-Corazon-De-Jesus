import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Eye, EyeOff, LogIn, User, Lock, Mountain } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    100
    const success = login(username, password);
    if (!success) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="absolute top-10 left-10">
        <Mountain className="w-32 h-32 text-yellow-500/10 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10">
        <Mountain className="w-24 h-24 text-blue-500/10 transform -rotate-12" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header con logo y título */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Mountain className="w-10 h-10 text-slate-800" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-xl"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Cañón Colorado
          </h1>
          <p className="text-yellow-400 font-medium text-lg mb-1">"Dios es Amor"</p>
          <p className="text-slate-400 text-sm">Sistema de Gestión Minera</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header del card con gradiente */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6" />
              Iniciar Sesión
            </h2>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Usuario */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Ingresa tu usuario"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de login */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Iniciar Sesión</span>
              </Button>
            </form>

            {/* Credenciales de prueba */}
            <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 mb-3">🔑 Credenciales de Prueba</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500">Usuario:</span> <strong className="text-slate-800">admin</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500">Contraseña:</span> <strong className="text-slate-800">admin123</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            © 2025 Cañón Colorado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;