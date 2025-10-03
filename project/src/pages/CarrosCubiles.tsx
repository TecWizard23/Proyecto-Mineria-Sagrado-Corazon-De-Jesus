import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { carrosCubilesMock } from '../services/mockData';
import { CarroCubil } from '../types';
import { Plus, CreditCard as Edit, Trash2, Truck, Search, Filter } from 'lucide-react';

const CarrosCubiles = () => {
  const [carros, setCarros] = useState<CarroCubil[]>(carrosCubilesMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarro, setEditingCarro] = useState<CarroCubil | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');

  const [formData, setFormData] = useState({
    codigo: '',
    capacidad: '',
    estado: 'activo' as const,
    ubicacion: '',
    ultimoMantenimiento: ''
  });

  const resetForm = () => {
    setFormData({
      codigo: '',
      capacidad: '',
      estado: 'activo',
      ubicacion: '',
      ultimoMantenimiento: ''
    });
    setEditingCarro(null);
  };

  const openModal = (carro?: CarroCubil) => {
    if (carro) {
      setEditingCarro(carro);
      setFormData({
        codigo: carro.codigo,
        capacidad: carro.capacidad.toString(),
        estado: carro.estado,
        ubicacion: carro.ubicacion,
        ultimoMantenimiento: carro.ultimoMantenimiento || ''
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const carroData: CarroCubil = {
      id: editingCarro?.id || Date.now().toString(),
      codigo: formData.codigo,
      capacidad: parseInt(formData.capacidad),
      estado: formData.estado,
      ubicacion: formData.ubicacion,
      fechaRegistro: editingCarro?.fechaRegistro || new Date().toISOString().split('T')[0],
      ultimoMantenimiento: formData.ultimoMantenimiento || undefined
    };

    if (editingCarro) {
      setCarros(carros.map(c => c.id === editingCarro.id ? carroData : c));
    } else {
      setCarros([...carros, carroData]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este carro?')) {
      setCarros(carros.filter(c => c.id !== id));
    }
  };

  const filteredCarros = carros.filter(carro => {
    const matchesSearch = carro.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         carro.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEstado === '' || carro.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const getEstadoBadge = (estado: CarroCubil['estado']) => {
    const colors = {
      activo: 'bg-green-100 text-green-800',
      mantenimiento: 'bg-yellow-100 text-yellow-800',
      fuera_servicio: 'bg-red-100 text-red-800'
    };
    return colors[estado];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Carros Cubiles</h1>
          <p className="text-gray-600 mt-1">Gestión de carros de transporte</p>
        </div>
        <Button onClick={() => openModal()} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Carro</span>
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por código o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="fuera_servicio">Fuera de Servicio</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de carros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Lista de Carros ({filteredCarros.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Código</th>
                  <th className="text-left py-3 px-4 font-semibold">Capacidad (ton)</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
                  <th className="text-left py-3 px-4 font-semibold">Último Mantenimiento</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCarros.map((carro) => (
                  <tr key={carro.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{carro.codigo}</td>
                    <td className="py-3 px-4">{carro.capacidad}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getEstadoBadge(carro.estado)}`}>
                        {carro.estado.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{carro.ubicacion}</td>
                    <td className="py-3 px-4">
                      {carro.ultimoMantenimiento ? 
                        new Date(carro.ultimoMantenimiento).toLocaleDateString() : 
                        'No registrado'
                      }
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(carro)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(carro.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCarro ? 'Editar Carro' : 'Nuevo Carro'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código
            </label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) => setFormData({...formData, codigo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad (toneladas)
            </label>
            <input
              type="number"
              value={formData.capacidad}
              onChange={(e) => setFormData({...formData, capacidad: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value as CarroCubil['estado']})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="activo">Activo</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="fuera_servicio">Fuera de Servicio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              value={formData.ubicacion}
              onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Último Mantenimiento
            </label>
            <input
              type="date"
              value={formData.ultimoMantenimiento}
              onChange={(e) => setFormData({...formData, ultimoMantenimiento: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingCarro ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CarrosCubiles;