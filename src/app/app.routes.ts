import { Routes } from '@angular/router';
import { FlotaComponent } from './flota/flota.component';
import { GuanteraComponent } from './guantera/guantera.component';

export const routes: Routes = [
    { path: 'flota', component: FlotaComponent },
    { path: 'ficha-vehiculo', component: FlotaComponent },
    { path: 'guantera', component: GuanteraComponent }
];
