import { Routes } from '@angular/router';
import { FlotaComponent } from './components/flota/flota.component';
import { GuanteraComponent } from './components/guantera/guantera.component';
import { AdminLoginComponent } from './components/admin/login/login.component';
import { CuentasComponent } from './components/admin/cuentas/cuentas.component';

export const routes: Routes = [
  { path: 'login/admin', component: AdminLoginComponent },
  { path: 'flota', component: FlotaComponent },
  { path: 'ficha-vehiculo', component: FlotaComponent },
  { path: 'guantera', component: GuanteraComponent },
  { path: 'admin/cuentas', component: CuentasComponent },
];
