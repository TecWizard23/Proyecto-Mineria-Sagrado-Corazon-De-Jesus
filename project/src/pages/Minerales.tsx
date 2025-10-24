import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  carrosCubilesMock, 
  insumosQuimicosMock, 
  trabajadoresMock, 
  facturasMock,
  asistenciasMock 
} from '../services/mockData';
import { BarChart3, Download, Filter, FileText, Calendar, TrendingUp, PieChart } from 'lucide-react';

const Reportes = () => {
  const [fechaInicio, setFechaInicio] = useState('2024-12-01');
  const [fechaFin, setFechaFin] = useState('2024-12-31');
  const [tipoReporte, setTipoReporte] = useState('general');

  const exportarReporte = (tipo: string) => {
    // Simulación de exportación
    alert(`Reporte ${tipo} exportado exitosamente (simulación)`);
  };

  // Datos para gráficos simulados
  const ventasMensuales = [
    { mes: 'Ene', ventas: 45000 },
    { mes: 'Feb', ventas: 52000 },
    { mes: 'Mar', ventas: 48000 },
    { mes: 'Abr', ventas: 61000 },
    { mes: 'May', ventas: 55000 },
    { mes: 'Jun', ventas: 67000 },
    { mes: 'Jul', ventas: 58000 },
    { mes: 'Ago', ventas: 62000 },
    { mes: 'Sep', ventas: 59000 },
    { mes: 'Oct', ventas: 64000 },
    { mes: 'Nov', ventas: 68000 },
    { mes: 'Dic', ventas: 72000 }
  ];

  const produccionSemanal = [85, 92, 78, 95, 88, 91, 87];
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Estadísticas calculadas
  const statsCarros = {
    total: carrosCubilesMock.length,
    activos: carrosCubilesMock.filter(c => c.estado === 'activo').length,
    mantenimiento: carrosCubilesMock.filter(c => c.estado === 'mantenimiento').length
  };

  const statsInsumos = {
    total: insumosQuimicosMock.length,
    bajoStock: insumosQuimicosMock.filter(i => i.stock <= i.stockMinimo).length,
    valorInventario: insumosQuimicosMock.reduce((sum, i) => sum + (i.stock * i.precio), 0)
  };

  const statsVentas = {
    totalFacturado: facturasMock.reduce((sum, f) => sum + f.total, 0),
    facturasPendientes: facturasMock.filter(f => f.estado === 'pendiente').length,
    facturasPagadas: facturasMock.filter(f => f.estado === 'pagada').length
  };

  const statsPersonal = {
    totalTrabajadores: trabajadoresMock.length,
    activos: trabajadoresMock.filter(t => t.estado === 'activo').length,
    asistenciaHoy: asistenciasMock.filter(a => a.estado === 'presente').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600 mt-1">Análisis y reportes del sistema</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => exportarReporte('PDF')}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Exportar PDF</span>
          </Button>
          <Button 
            onClick={() => exportarReporte('Excel')}
            variant="success"
            className="flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Exportar Excel</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">General</option>
                <option value="ventas">Ventas</option>
                <option value="produccion">Producción</option>
                <option value="inventario">Inventario</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <Button className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Aplicar Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carros Activos</p>
                <p className="text-2xl font-bold text-green-600">{statsCarros.activos}/{statsCarros.total}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((statsCarros.activos / statsCarros.total) * 100)}% operativos
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Inventario</p>
                <p className="text-2xl font-bold text-blue-600">${statsInsumos.valorInventario.toLocaleString()}</p>
                <p className="text-xs text-gray-500">
                  {statsInsumos.bajoStock} items bajo stock
                </p>
              </div>
              <PieChart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ventas Mes</p>
                <p className="text-2xl font-bold text-purple-600">${statsVentas.totalFacturado.toLocaleString()}</p>
                <p className="text-xs text-gray-500">
                  {statsVentas.facturasPagadas} facturas pagadas
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Personal Activo</p>
                <p className="text-2xl font-bold text-orange-600">{statsPersonal.activos}</p>
                <p className="text-xs text-gray-500">
                  {statsPersonal.asistenciaHoy} presentes hoy
                </p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ventas Mensuales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Ventas Mensuales 2024</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-1">
              {ventasMensuales.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${(data.ventas / 80000) * 200}px` }}
                    title={`${data.mes}: $${data.ventas.toLocaleString()}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.mes}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Ingresos por ventas en miles de dólares</p>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Producción Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <span>Producción Semanal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {produccionSemanal.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                    style={{ height: `${(value / 100) * 200}px` }}
                    title={`${diasSemana[index]}: ${value}%`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{diasSemana[index]}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Porcentaje de eficiencia por día</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de datos detallados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <span>Datos Detallados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Estado de Carros</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Activos:</span>
                  <span className="font-medium text-green-600">{statsCarros.activos}</span>
                </div>
                <div className="flex justify-between">
                  <span>En Mantenimiento:</span>
                  <span className="font-medium text-yellow-600">{statsCarros.mantenimiento}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuera de Servicio:</span>
                  <span className="font-medium text-red-600">
                    {statsCarros.total - statsCarros.activos - statsCarros.mantenimiento}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Estado de Inventario</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total de Insumos:</span>
                  <span className="font-medium">{statsInsumos.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bajo Stock:</span>
                  <span className="font-medium text-red-600">{statsInsumos.bajoStock}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Total:</span>
                  <span className="font-medium text-green-600">
                    ${statsInsumos.valorInventario.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Estado de Facturación</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Facturas Pagadas:</span>
                  <span className="font-medium text-green-600">{statsVentas.facturasPagadas}</span>
                </div>
                <div className="flex justify-between">
                  <span>Facturas Pendientes:</span>
                  <span className="font-medium text-yellow-600">{statsVentas.facturasPendientes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Facturado:</span>
                  <span className="font-medium">${statsVentas.totalFacturado.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Personal</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Trabajadores:</span>
                  <span className="font-medium">{statsPersonal.totalTrabajadores}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personal Activo:</span>
                  <span className="font-medium text-green-600">{statsPersonal.activos}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asistencia Hoy:</span>
                  <span className="font-medium text-blue-600">{statsPersonal.asistenciaHoy}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reportes;