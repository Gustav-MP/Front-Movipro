import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
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
    canActivate: [authGuard, roleGuard],
    component: MainLayoutComponent,
    data: { roles: ['client'] },
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
    canActivate: [authGuard, roleGuard],
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
