// Tipos para el sistema de gestión minera

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'supervisor' | 'operator';
  email: string;
}

export interface CarroCubil {
  id: string;
  codigo: string;
  capacidad: number;
  estado: 'activo' | 'mantenimiento' | 'fuera_servicio';
  ubicacion: string;
  fechaRegistro: string;
  ultimoMantenimiento?: string;
}

export interface InsumoQuimico {
  id: string;
  nombre: string;
  codigo: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  unidad: string;
  precio: number;
  proveedor: string;
  fechaVencimiento: string;
  ubicacionAlmacen: string;
}

export interface Trabajador {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  turno: 'mañana' | 'tarde' | 'noche';
  telefono: string;
  email: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo';
}

export interface Asistencia {
  id: string;
  trabajadorId: string;
  fecha: string;
  horaEntrada: string;
  horaSalida?: string;
  estado: 'presente' | 'ausente' | 'tardanza' | 'permiso';
  observaciones?: string;
}

export interface Factura {
  id: string;
  numero: string;
  cliente: string;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'pendiente' | 'pagada' | 'anulada';
  items: FacturaItem[];
}

export interface FacturaItem {
  id: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface DashboardStats {
  totalCarros: number;
  carrosActivos: number;
  insumosBajoStock: number;
  trabajadoresActivos: number;
  facturasPendientes: number;
  ventasMes: number;
}