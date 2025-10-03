import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { dashboardStatsMock } from '../services/mockData';
import { Truck, FlaskRound as Flask, Users, FileText, TrendingUp, AlertTriangle, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = dashboardStatsMock;

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string; 
    trend?: { value: string; positive: boolean; } 
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-sm mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general del sistema</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Carros Activos"
          value={`${stats.carrosActivos}/${stats.totalCarros}`}
          icon={Truck}
          color="bg-blue-500"
          trend={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Insumos Bajo Stock"
          value={stats.insumosBajoStock}
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
        <StatCard
          title="Trabajadores Activos"
          value={stats.trabajadoresActivos}
          icon={Users}
          color="bg-green-500"
          trend={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Ventas del Mes"
          value={`$${stats.ventasMes.toLocaleString()}`}
          icon={DollarSign}
          color="bg-purple-500"
          trend={{ value: "8%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas y notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span>Alertas del Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Flask className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">Stock bajo: Cal Viva</p>
                    <p className="text-sm text-gray-600">Solo quedan 50 ton en inventario</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Urgente</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Carro CC-002 en mantenimiento</p>
                    <p className="text-sm text-gray-600">Programado para finalizar mañana</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Info</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">8 facturas pendientes</p>
                    <p className="text-sm text-gray-600">Total: $58,400 por cobrar</p>
                  </div>
                </div>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">Atención</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span>Actividad Reciente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Nueva factura generada</p>
                  <p className="text-sm text-gray-600">F-2024-003 por $32,500</p>
                  <p className="text-xs text-gray-400">Hace 2 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Ingreso de insumos</p>
                  <p className="text-sm text-gray-600">500kg de Xantato de Potasio</p>
                  <p className="text-xs text-gray-400">Hace 4 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Mantenimiento completado</p>
                  <p className="text-sm text-gray-600">Carro CC-001 operativo</p>
                  <p className="text-xs text-gray-400">Ayer</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Nuevo trabajador registrado</p>
                  <p className="text-sm text-gray-600">Ana María López - Técnico de Laboratorio</p>
                  <p className="text-xs text-gray-400">2 días</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de producción (simulado) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Producción Mensual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 80, 75, 90, 85, 95, 100, 88, 92, 87, 94, 98].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${value * 2}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Producción en toneladas de mineral procesado</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;