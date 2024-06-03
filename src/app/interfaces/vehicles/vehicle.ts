export interface Vehicle {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  year: number;
  region: string;
  ciudad: string;
  empresa_contrato: string;
  vin: string;
  ultima_rt: Date;
  ultima_mantencion: Date;
  valor_compra: number;
  valor_mercado: number;
  estado_vehiculo: string;
  id_conductor: number;
  valor_contrato: number;
  fecha_inicio_contrato: Date;
  fecha_termino_contrato: Date;
  docs: Document[];
}

export interface Fleet {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Document {
  nombre: string;
  url: string;
  fecha: string;
}
