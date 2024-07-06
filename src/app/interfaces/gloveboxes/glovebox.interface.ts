export interface Glovebox {
  id: number;
  documents: Document[];
}

export interface Document {
  id: number;
  nombre: string;
  tipo: string;
  url: string;
  fecha_carga: Date;
}

export interface QrDocument {
  tipo: string;
  fecha_carga: Date;
  archivo: string;
}
