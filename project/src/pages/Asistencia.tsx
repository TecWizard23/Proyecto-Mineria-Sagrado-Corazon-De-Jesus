import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { trabajadoresMock, asistenciasMock } from '../services/mockData';
import { Trabajador, Asistencia } from '../types';
import { Users, CheckCircle, XCircle, Clock, UserCheck, Download, Calendar } from 'lucide-react';

const AsistenciaPage = () => {
  const [trabajadores] = useState<Trabajador[]>(trabajadoresMock);
  const [asistencias, setAsistencias] = useState<Asistencia[]>(asistenciasMock);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );

  const marcarAsistencia = (trabajadorId: string, estado: Asistencia['estado']) => {
    const existeAsistencia = asistencias.find(
      a => a.trabajadorId === trabajadorId && a.fecha === fechaSeleccionada
    );

    if (existeAsistencia) {
      setAsistencias(asistencias.map(a => 
        a.id === existeAsistencia.id 
          ? { ...a, estado, horaEntrada: new Date().toLocaleTimeString('en-GB', {hour12: false}).slice(0,5) }
          : a
      ));
    } else {
      const nuevaAsistencia: Asistencia = {
        id: Date.now().toString(),
        trabajadorId,
        fecha: fechaSeleccionada,
        horaEntrada: new Date().toLocaleTimeString('en-GB', {hour12: false}).slice(0,5),
        estado
      };
      setAsistencias([...asistencias, nuevaAsistencia]);
    }
  };

  const obtenerAsistencia = (trabajadorId: string): Asistencia | undefined => {
    return asistencias.find(
      a => a.trabajadorId === trabajadorId && a.fecha === fechaSeleccionada
    );
  };

  const exportarReporte = () => {
    // Simulación de exportación
    alert('Reporte exportado exitosamente (simulación)');
  };

  const getEstadoBadge = (estado: Asistencia['estado']) => {
    const badges = {
      presente: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      ausente: { color: 'bg-red-100 text-red-800', icon: XCircle },
      tardanza: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      permiso: { color: 'bg-blue-100 text-blue-800', icon: UserCheck }
    };
    return badges[estado];
  };

  const asistenciasDia = asistencias.filter(a => a.fecha === fechaSeleccionada);
  const presentes = asistenciasDia.filter(a => a.estado === 'presente').length;
  const tardanzas = asistenciasDia.filter(a => a.estado === 'tardanza').length;
  const ausentes = asistenciasDia.filter(a => a.estado === 'ausente').length;
  const permisos = asistenciasDia.filter(a => a.estado === 'permiso').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia</h1>
          <p className="text-gray-600 mt-1">Registro de asistencia de trabajadores</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={exportarReporte}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Exportar Reporte</span>
          </Button>
        </div>
      </div>

      {/* Selector de fecha y estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Fecha</p>
                <input
                  type="date"
                  value={fechaSeleccionada}
                  onChange={(e) => setFechaSeleccionada(e.target.value)}
                  className="text-lg font-bold text-gray-900 border-none p-0 focus:ring-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presentes</p>
                <p className="text-2xl font-bold text-green-600">{presentes}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tardanzas</p>
                <p className="text-2xl font-bold text-yellow-600">{tardanzas}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ausentes</p>
                <p className="text-2xl font-bold text-red-600">{ausentes}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Permisos</p>
                <p className="text-2xl font-bold text-blue-600">{permisos}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de trabajadores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Lista de Trabajadores</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Trabajador</th>
                  <th className="text-left py-3 px-4 font-semibold">Cédula</th>
                  <th className="text-left py-3 px-4 font-semibold">Cargo</th>
                  <th className="text-left py-3 px-4 font-semibold">Turno</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Hora Entrada</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {trabajadores.map((trabajador) => {
                  const asistencia = obtenerAsistencia(trabajador.id);
                  
                  return (
                    <tr key={trabajador.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{trabajador.nombre}</p>
                          <p className="text-sm text-gray-500">{trabajador.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{trabajador.cedula}</td>
                      <td className="py-3 px-4">{trabajador.cargo}</td>
                      <td className="py-3 px-4 capitalize">{trabajador.turno}</td>
                      <td className="py-3 px-4">
                        {asistencia ? (
                          <span className={`px-2 py-1 text-xs rounded-full ${getEstadoBadge(asistencia.estado).color}`}>
                            {asistencia.estado.toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-gray-400">Sin registrar</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {asistencia?.horaEntrada || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => marcarAsistencia(trabajador.id, 'presente')}
                            className="p-1 text-green-600 hover:text-green-800 title='Presente'"
                            title="Marcar presente"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => marcarAsistencia(trabajador.id, 'tardanza')}
                            className="p-1 text-yellow-600 hover:text-yellow-800"
                            title="Marcar tardanza"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => marcarAsistencia(trabajador.id, 'ausente')}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Marcar ausente"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => marcarAsistencia(trabajador.id, 'permiso')}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Marcar permiso"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsistenciaPage;