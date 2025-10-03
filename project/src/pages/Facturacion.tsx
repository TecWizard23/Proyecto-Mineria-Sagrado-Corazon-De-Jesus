import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { facturasMock } from '../services/mockData';
import { Factura, FacturaItem } from '../types';
import { Plus, CreditCard as Edit, Eye, FileText, Search, Filter, DollarSign, Calendar } from 'lucide-react';

const Facturacion = () => {
  const [facturas, setFacturas] = useState<Factura[]>(facturasMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingFactura, setEditingFactura] = useState<Factura | null>(null);
  const [viewingFactura, setViewingFactura] = useState<Factura | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');

  const [formData, setFormData] = useState({
    numero: '',
    cliente: '',
    fecha: new Date().toISOString().split('T')[0],
    items: [{ descripcion: '', cantidad: 1, precioUnitario: 0 }]
  });

  const resetForm = () => {
    setFormData({
      numero: '',
      cliente: '',
      fecha: new Date().toISOString().split('T')[0],
      items: [{ descripcion: '', cantidad: 1, precioUnitario: 0 }]
    });
    setEditingFactura(null);
  };

  const openModal = (factura?: Factura) => {
    if (factura) {
      setEditingFactura(factura);
      setFormData({
        numero: factura.numero,
        cliente: factura.cliente,
        fecha: factura.fecha,
        items: factura.items.map(item => ({
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario
        }))
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

  const viewFactura = (factura: Factura) => {
    setViewingFactura(factura);
    setIsViewModalOpen(true);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { descripcion: '', cantidad: 1, precioUnitario: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index)
      });
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const calcularSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  };

  const calcularIVA = (subtotal: number) => {
    return subtotal * 0.16; // 16% IVA
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subtotal = calcularSubtotal();
    const iva = calcularIVA(subtotal);
    const total = subtotal + iva;

    const facturaData: Factura = {
      id: editingFactura?.id || Date.now().toString(),
      numero: formData.numero,
      cliente: formData.cliente,
      fecha: formData.fecha,
      subtotal,
      iva,
      total,
      estado: editingFactura?.estado || 'pendiente',
      items: formData.items.map((item, index) => ({
        id: (index + 1).toString(),
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        subtotal: item.cantidad * item.precioUnitario
      }))
    };

    if (editingFactura) {
      setFacturas(facturas.map(f => f.id === editingFactura.id ? facturaData : f));
    } else {
      setFacturas([...facturas, facturaData]);
    }

    closeModal();
  };

  const cambiarEstado = (id: string, nuevoEstado: Factura['estado']) => {
    setFacturas(facturas.map(f => 
      f.id === id ? { ...f, estado: nuevoEstado } : f
    ));
  };

  const filteredFacturas = facturas.filter(factura => {
    const matchesSearch = factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factura.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEstado === '' || factura.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const getEstadoBadge = (estado: Factura['estado']) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      pagada: 'bg-green-100 text-green-800',
      anulada: 'bg-red-100 text-red-800'
    };
    return colors[estado];
  };

  const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0);
  const totalPendiente = facturas.filter(f => f.estado === 'pendiente').reduce((sum, f) => sum + f.total, 0);
  const totalPagado = facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Facturación</h1>
          <p className="text-gray-600 mt-1">Gestión de facturas y cobros</p>
        </div>
        <Button onClick={() => openModal()} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nueva Factura</span>
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Facturado</p>
                <p className="text-2xl font-bold text-gray-900">${totalFacturado.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Por Cobrar</p>
                <p className="text-2xl font-bold text-yellow-600">${totalPendiente.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cobrado</p>
                <p className="text-2xl font-bold text-green-600">${totalPagado.toLocaleString()}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
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
                  placeholder="Buscar por número de factura o cliente..."
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
                <option value="pendiente">Pendiente</option>
                <option value="pagada">Pagada</option>
                <option value="anulada">Anulada</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de facturas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Facturas ({filteredFacturas.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Número</th>
                  <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map((factura) => (
                  <tr key={factura.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{factura.numero}</td>
                    <td className="py-3 px-4">{factura.cliente}</td>
                    <td className="py-3 px-4">
                      {new Date(factura.fecha).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-medium">${factura.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getEstadoBadge(factura.estado)}`}>
                        {factura.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewFactura(factura)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Ver factura"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(factura)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Editar factura"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {factura.estado === 'pendiente' && (
                          <Button
                            size="sm"
                            onClick={() => cambiarEstado(factura.id, 'pagada')}
                            className="text-xs"
                          >
                            Marcar Pagada
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de nueva/editar factura */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingFactura ? 'Editar Factura' : 'Nueva Factura'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Factura
              </label>
              <input
                type="text"
                value={formData.numero}
                onChange={(e) => setFormData({...formData, numero: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente
              </label>
              <input
                type="text"
                value={formData.cliente}
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Items</h3>
              <Button type="button" onClick={addItem} variant="secondary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Agregar Item
              </Button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={item.descripcion}
                    onChange={(e) => updateItem(index, 'descripcion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    placeholder="Cant."
                    value={item.cantidad}
                    onChange={(e) => updateItem(index, 'cantidad', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    placeholder="Precio Unit."
                    value={item.precioUnitario}
                    onChange={(e) => updateItem(index, 'precioUnitario', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="col-span-1">
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeItem(index)}
                      variant="danger"
                      size="sm"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${calcularSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>IVA (16%):</span>
                  <span>${calcularIVA(calcularSubtotal()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${(calcularSubtotal() + calcularIVA(calcularSubtotal())).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingFactura ? 'Actualizar' : 'Guardar'} Factura
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de vista de factura */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Vista de Factura"
        size="lg"
      >
        {viewingFactura && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Empresa Minera Cañón Colorado</h3>
                  <p className="text-sm text-gray-600">"Dios es Amor"</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold text-lg">{viewingFactura.numero}</h3>
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(viewingFactura.fecha).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Cliente:</h4>
              <p>{viewingFactura.cliente}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Detalle:</h4>
              <table className="w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-2 text-left">Descripción</th>
                    <th className="border p-2 text-center">Cantidad</th>
                    <th className="border p-2 text-right">Precio Unit.</th>
                    <th className="border p-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingFactura.items.map(item => (
                    <tr key={item.id}>
                      <td className="border p-2">{item.descripcion}</td>
                      <td className="border p-2 text-center">{item.cantidad}</td>
                      <td className="border p-2 text-right">${item.precioUnitario.toFixed(2)}</td>
                      <td className="border p-2 text-right">${item.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="w-48">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${viewingFactura.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>IVA:</span>
                    <span>${viewingFactura.iva.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${viewingFactura.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Facturacion;