import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { insumosQuimicosMock } from '../services/mockData';
import { InsumoQuimico } from '../types';
import { Plus, CreditCard as Edit, Trash2, FlaskRound as Flask, Search, Filter, AlertTriangle, Package } from 'lucide-react';

const InsumosQuimicos = () => {
  const [insumos, setInsumos] = useState<InsumoQuimico[]>(insumosQuimicosMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<InsumoQuimico | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');

  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    categoria: '',
    stock: '',
    stockMinimo: '',
    unidad: '',
    precio: '',
    proveedor: '',
    fechaVencimiento: '',
    ubicacionAlmacen: ''
  });

  const resetForm = () => {
    setFormData({
      nombre: '',
      codigo: '',
      categoria: '',
      stock: '',
      stockMinimo: '',
      unidad: '',
      precio: '',
      proveedor: '',
      fechaVencimiento: '',
      ubicacionAlmacen: ''
    });
    setEditingInsumo(null);
  };

  const openModal = (insumo?: InsumoQuimico) => {
    if (insumo) {
      setEditingInsumo(insumo);
      setFormData({
        nombre: insumo.nombre,
        codigo: insumo.codigo,
        categoria: insumo.categoria,
        stock: insumo.stock.toString(),
        stockMinimo: insumo.stockMinimo.toString(),
        unidad: insumo.unidad,
        precio: insumo.precio.toString(),
        proveedor: insumo.proveedor,
        fechaVencimiento: insumo.fechaVencimiento,
        ubicacionAlmacen: insumo.ubicacionAlmacen
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
    
    const insumoData: InsumoQuimico = {
      id: editingInsumo?.id || Date.now().toString(),
      nombre: formData.nombre,
      codigo: formData.codigo,
      categoria: formData.categoria,
      stock: parseInt(formData.stock),
      stockMinimo: parseInt(formData.stockMinimo),
      unidad: formData.unidad,
      precio: parseFloat(formData.precio),
      proveedor: formData.proveedor,
      fechaVencimiento: formData.fechaVencimiento,
      ubicacionAlmacen: formData.ubicacionAlmacen
    };

    if (editingInsumo) {
      setInsumos(insumos.map(i => i.id === editingInsumo.id ? insumoData : i));
    } else {
      setInsumos([...insumos, insumoData]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este insumo?')) {
      setInsumos(insumos.filter(i => i.id !== id));
    }
  };

  const filteredInsumos = insumos.filter(insumo => {
    const matchesSearch = insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insumo.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insumo.proveedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategoria === '' || insumo.categoria === filterCategoria;
    return matchesSearch && matchesFilter;
  });

  const getStockStatus = (insumo: InsumoQuimico) => {
    if (insumo.stock <= insumo.stockMinimo) {
      return { color: 'text-red-600', icon: AlertTriangle, status: 'Bajo Stock' };
    } else if (insumo.stock <= insumo.stockMinimo * 1.5) {
      return { color: 'text-yellow-600', icon: Package, status: 'Stock Medio' };
    }
    return { color: 'text-green-600', icon: Package, status: 'Stock Normal' };
  };

  const categorias = [...new Set(insumos.map(i => i.categoria))];
  const insumosBajoStock = insumos.filter(i => i.stock <= i.stockMinimo);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insumos Químicos</h1>
          <p className="text-gray-600 mt-1">Gestión de inventario químico</p>
        </div>
        <Button onClick={() => openModal()} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Insumo</span>
        </Button>
      </div>

      {/* Alertas de stock bajo */}
      {insumosBajoStock.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">
                  {insumosBajoStock.length} insumos con stock bajo
                </h3>
                <p className="text-sm text-red-600">
                  {insumosBajoStock.map(i => i.nombre).join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, código o proveedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterCategoria}
                onChange={(e) => setFilterCategoria(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de insumos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flask className="w-5 h-5" />
            <span>Inventario ({filteredInsumos.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Código</th>
                  <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                  <th className="text-left py-3 px-4 font-semibold">Categoría</th>
                  <th className="text-left py-3 px-4 font-semibold">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Precio Unit.</th>
                  <th className="text-left py-3 px-4 font-semibold">Proveedor</th>
                  <th className="text-left py-3 px-4 font-semibold">Vencimiento</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInsumos.map((insumo) => {
                  const stockStatus = getStockStatus(insumo);
                  return (
                    <tr key={insumo.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{insumo.codigo}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{insumo.nombre}</p>
                          <p className="text-sm text-gray-500">{insumo.ubicacionAlmacen}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{insumo.categoria}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{insumo.stock} {insumo.unidad}</p>
                          <p className="text-xs text-gray-500">Min: {insumo.stockMinimo}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center space-x-1 ${stockStatus.color}`}>
                          <stockStatus.icon className="w-4 h-4" />
                          <span className="text-xs font-medium">{stockStatus.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">${insumo.precio.toFixed(2)}</td>
                      <td className="py-3 px-4">{insumo.proveedor}</td>
                      <td className="py-3 px-4">
                        {new Date(insumo.fechaVencimiento).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(insumo)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(insumo.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingInsumo ? 'Editar Insumo' : 'Nuevo Insumo'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

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
              Categoría
            </label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad
            </label>
            <select
              value={formData.unidad}
              onChange={(e) => setFormData({...formData, unidad: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccionar...</option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="L">L</option>
              <option value="m³">m³</option>
              <option value="unidad">unidad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Actual
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Mínimo
            </label>
            <input
              type="number"
              value={formData.stockMinimo}
              onChange={(e) => setFormData({...formData, stockMinimo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Unitario
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proveedor
            </label>
            <input
              type="text"
              value={formData.proveedor}
              onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={formData.fechaVencimiento}
              onChange={(e) => setFormData({...formData, fechaVencimiento: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación en Almacén
            </label>
            <input
              type="text"
              value={formData.ubicacionAlmacen}
              onChange={(e) => setFormData({...formData, ubicacionAlmacen: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-3 pt-6">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingInsumo ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InsumosQuimicos;