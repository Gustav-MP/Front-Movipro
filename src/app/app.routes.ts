import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'flota',
        loadComponent: () =>
          import('./components/flota/flota.component').then(
            (m) => m.FlotaComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminLayoutComponent,
    data: { roles: ['admin'] },
    children: [
      {
        path: 'cuentas',
        loadComponent: () =>
          import('./components/admin/cuentas/cuentas.component').then(
            (m) => m.CuentasComponent,
          ),
      },
    ],
  },
];
