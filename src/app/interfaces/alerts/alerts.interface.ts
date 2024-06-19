import { ThemePalette } from '@angular/material/core';

export interface Alerts {
  badge: AlertBadge;
  list: RespApiAlerts[];
}

export interface RespApiAlerts {
  alerta: Alerta;
  registroServicio: RegistroServicio;
  servicio: Servicio;
  vehiculo: Vehiculo;
  flota: Flota;
}

interface AlertBadge {
  count: number;
  color: ThemePalette;
}

interface Alerta {
  id: number;
  estado: string;
  fecha_termino: Date;
  descripcion: string;
}

interface RegistroServicio {
  id: number;
}

interface Servicio {
  id: number;
}

interface Vehiculo {
  id: number;
}

interface Flota {
  id: number;
}
