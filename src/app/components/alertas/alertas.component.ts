import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';

import { AlertsService } from '../../services/clients/alerts.service';
import { Subscription, firstValueFrom } from 'rxjs';
import {
  Alerts,
  RespApiAlerts,
} from '../../interfaces/alerts/alerts.interface';
import { ListaAlertasComponent } from './lista-alertas/lista-alertas.component';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    ListaAlertasComponent,
  ],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css',
})
export class AlertasComponent implements OnInit {
  constructor(private alertsService: AlertsService) {}

  pendingAlerts: Alerts = { list: [], badge: { count: 0, color: 'primary' } };
  expiredAlerts: Alerts = { list: [], badge: { count: 0, color: 'primary' } };
  closedAlerts: Alerts = { list: [], badge: { count: 0, color: 'primary' } };

  dataSource?: RespApiAlerts[];

  async ngOnInit(): Promise<void> {
    try {
      const alerts: RespApiAlerts[] = await firstValueFrom(
        this.alertsService.getByUser(),
      );
      this.separateAlertsByStatus(alerts);
      this.dataSource = this.pendingAlerts.list;
      console.log('oninit datasource -->', this.dataSource);
    } catch (error) {
      console.error('Failed to fetch alerts', error);
    }
  }

  private separateAlertsByStatus(alerts: RespApiAlerts[]): void {
    this.pendingAlerts.list = alerts.filter(
      (alert) => alert.alerta.estado === 'pendiente',
    );
    this.expiredAlerts.list = alerts.filter(
      (alert) => alert.alerta.estado === 'vencida',
    );
    this.closedAlerts.list = alerts.filter(
      (alert) => alert.alerta.estado === 'cerrada',
    );

    this.updateAlertBadge(this.pendingAlerts);
    this.updateAlertBadge(this.expiredAlerts);
    this.updateAlertBadge(this.closedAlerts);
  }

  private updateAlertBadge(alerts: Alerts): void {
    alerts.badge.count = alerts.list.length;
    alerts.badge.color = alerts.badge.count > 0 ? 'warn' : 'primary';
  }

  public onTabChange(index: number): void {
    console.log('event tab --->', index);
    switch (index) {
      case 0:
        console.log('Pendientes tab activated', this.pendingAlerts);
        this.dataSource = this.pendingAlerts.list;
        break;
      case 1:
        console.log('Vencidas tab activated', this.expiredAlerts);
        this.dataSource = this.expiredAlerts.list;
        break;
      case 2:
        console.log('Cerradas tab activated', this.closedAlerts);
        this.dataSource = this.closedAlerts.list;
        break;
    }
  }
}
