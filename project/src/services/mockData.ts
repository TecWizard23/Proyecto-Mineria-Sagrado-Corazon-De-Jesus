import { CarroCubil, InsumoQuimico, Trabajador, Asistencia, Factura, DashboardStats } from '../types';

// Mock data para carros cubiles
export const carrosCubilesMock: CarroCubil[] = [
  {
    id: '1',
    codigo: 'CC-001',
    capacidad: 50,
    estado: 'activo',
    ubicacion: 'Sector A',
    fechaRegistro: '2024-01-15',
    ultimoMantenimiento: '2024-12-01'
  },
  {
    id: '2',
    codigo: 'CC-002',
    capacidad: 75,
    estado: 'mantenimiento',
    ubicacion: 'Sector B',
    fechaRegistro: '2024-02-10',
    ultimoMantenimiento: '2024-11-15'
  },
  {
    id: '3',
    codigo: 'CC-003',
    capacidad: 60,
    estado: 'activo',
    ubicacion: 'Sector C',
    fechaRegistro: '2024-03-05',
    ultimoMantenimiento: '2024-12-10'
  }
];

// Mock data para insumos químicos
export const insumosQuimicosMock: InsumoQuimico[] = [
  {
    id: '1',
    nombre: 'Cianuro de Sodio',
    codigo: 'IQ-001',
    categoria: 'Reactivos',
    stock: 500,
    stockMinimo: 100,
    unidad: 'kg',
    precio: 2500,
    proveedor: 'QuimiCorp',
    fechaVencimiento: '2025-06-15',
    ubicacionAlmacen: 'A-1-01'
  },
  {
    id: '2',
    nombre: 'Cal Viva',
    codigo: 'IQ-002',
    categoria: 'Alcalinizantes',
    stock: 50,
    stockMinimo: 200,
    unidad: 'ton',
    precio: 150,
    proveedor: 'CalMinerals',
    fechaVencimiento: '2025-12-31',
    ubicacionAlmacen: 'B-2-05'
  },
  {
    id: '3',
    nombre: 'Xantato de Potasio',
    codigo: 'IQ-003',
    categoria: 'Colectores',
    stock: 300,
    stockMinimo: 150,
    unidad: 'kg',
    precio: 1800,
    proveedor: 'FlotaQuim',
    fechaVencimiento: '2025-03-20',
    ubicacionAlmacen: 'A-2-03'
  }
];

// Mock data para trabajadores
export const trabajadoresMock: Trabajador[] = [
  {
    id: '1',
    nombre: 'Juan Carlos Pérez',
    cedula: '12345678',
    cargo: 'Operador de Planta',
    turno: 'mañana',
    telefono: '555-0101',
    email: 'juan.perez@canoncolorado.com',
    fechaIngreso: '2023-01-15',
    estado: 'activo'
  },
  {
    id: '2',
    nombre: 'María Elena García',
    cedula: '87654321',
    cargo: 'Supervisora de Turno',
    turno: 'tarde',
    telefono: '555-0102',
    email: 'maria.garcia@canoncolorado.com',
    fechaIngreso: '2022-06-10',
    estado: 'activo'
  },
  {
    id: '3',
    nombre: 'Carlos Alberto Ruiz',
    cedula: '11223344',
    cargo: 'Técnico de Mantenimiento',
    turno: 'noche',
    telefono: '555-0103',
    email: 'carlos.ruiz@canoncolorado.com',
    fechaIngreso: '2023-03-22',
    estado: 'activo'
  }
];

// Mock data para asistencias
export const asistenciasMock: Asistencia[] = [
  {
    id: '1',
    trabajadorId: '1',
    fecha: '2024-12-13',
    horaEntrada: '07:00',
    horaSalida: '15:00',
    estado: 'presente'
  },
  {
    id: '2',
    trabajadorId: '2',
    fecha: '2024-12-13',
    horaEntrada: '15:00',
    horaSalida: '23:00',
    estado: 'presente'
  },
  {
    id: '3',
    trabajadorId: '3',
    fecha: '2024-12-13',
    horaEntrada: '23:10',
    estado: 'tardanza',
    observaciones: 'Llegó 10 minutos tarde'
  }
];

// Mock data para facturas
export const facturasMock: Factura[] = [
  {
    id: '1',
    numero: 'F-2024-001',
    cliente: 'Procesadora de Minerales S.A.',
    fecha: '2024-12-10',
    subtotal: 15000,
    iva: 2400,
    total: 17400,
    estado: 'pagada',
    items: [
      {
        id: '1',
        descripcion: 'Concentrado de Oro - 50kg',
        cantidad: 1,
        precioUnitario: 15000,
        subtotal: 15000
      }
    ]
  },
  {
    id: '2',
    numero: 'F-2024-002',
    cliente: 'Refinería Nacional',
    fecha: '2024-12-12',
    subtotal: 25000,
    iva: 4000,
    total: 29000,
    estado: 'pendiente',
    items: [
      {
        id: '1',
        descripcion: 'Concentrado de Plata - 100kg',
        cantidad: 1,
        precioUnitario: 25000,
        subtotal: 25000
      }
    ]
  }
];

// Mock data para estadísticas del dashboard
export const dashboardStatsMock: DashboardStats = {
  totalCarros: 15,
  carrosActivos: 12,
  insumosBajoStock: 5,
  trabajadoresActivos: 45,
  facturasPendientes: 8,
  ventasMes: 125000
};