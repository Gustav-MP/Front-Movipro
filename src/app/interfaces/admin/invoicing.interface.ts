export interface Invoicing {
  id: number;
  id_cuenta: number;
  periodicidad_pago: number;
  monto_a_pagar: number;
  estado: string;
  fecha_ultimo_cobro: string;
  fecha_proximo_cobro: string;
}
