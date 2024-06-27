import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApexPlotOptions, ApexStroke, NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import { StorageService } from '../../services/storage/storage.service';
import {
  Credentials,
  UserCredentials,
} from '../../interfaces/auth/credentials.interface';
import { VehiclesService } from '../../services/clients/vehicles.service';
import { AlertsService } from '../../services/clients/alerts.service';
import { ServicesService } from '../../services/clients/services.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
};

type NumericPropertyKeys =
  | 'animatedNumVehicles'
  | 'animatedNumAlerts'
  | 'animatedNumServices'
  | 'animatedNumSavings';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatGridListModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userData!: UserCredentials;
  animatedNumVehicles: number = 0;
  animatedNumAlerts: number = 0;
  animatedNumServices: number = 0;
  animatedNumSavings: number = 0;

  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;

  constructor(
    private storageService: StorageService,
    private vehiclesService: VehiclesService,
    private alertsService: AlertsService,
    private servicesService: ServicesService,
  ) {
    this.chartOptions = this.getChartOptions();
  }

  async ngOnInit(): Promise<void> {
    const credentialsData: Credentials =
      await this.storageService.getLocalStorage('credentials');
    this.userData = credentialsData.user;

    try {
      const countVehicles = await firstValueFrom(
        this.vehiclesService.countAllVehicles(),
      );
      const countPendingAlerts = await firstValueFrom(
        this.alertsService.countByStatus('pendiente'),
      );
      const countServices = await firstValueFrom(
        this.servicesService.countAllServices(),
      );

      this.animateNumbers('animatedNumVehicles', countVehicles);
      this.animateNumbers('animatedNumAlerts', countPendingAlerts);
      this.animateNumbers('animatedNumServices', countServices);
      this.animateNumbers('animatedNumSavings', 0);
    } catch (error) {
      console.error('Error when count:', error);
    }
  }

  private animateNumbers(
    propertyToAnimate: NumericPropertyKeys,
    finalNumber: number,
  ) {
    let duration = 0;
    finalNumber > 10 ? (duration = 1500) : (duration = 500);
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this[propertyToAnimate] = progress * finalNumber;
      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  private getChartOptions(): ChartOptions {
    return {
      series: [
        {
          name: 'Repuestos',
          data: [1, 3, 0, 12, 9, 5],
        },
        {
          name: 'Mantenciones',
          data: [2, 6, 3, 8, 5, 2],
        },
        {
          name: 'Gruas',
          data: [1, 1, 0, 0, 1, 0],
        },
      ],
      chart: {
        width: '100%',
        height: '400',
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: 'Mis Servicios',
        style: {
          fontSize: '20px',
          fontWeight: '500',
          fontFamily: 'Bai Jamjuree',
          color: '#263238',
        },
      },
      stroke: {
        width: [4, 4, 4],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          borderRadius: 3,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
    };
  }
}
