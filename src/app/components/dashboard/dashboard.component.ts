import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApexPlotOptions, ApexStroke, NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

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
export class DashboardComponent implements OnInit, OnDestroy {
  userData!: UserCredentials;
  animatedNumVehicles: number = 0;
  animatedNumAlerts: number = 0;
  animatedNumServices: number = 0;
  animatedNumSavings: number = 0;

  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private subscriptions: Subscription = new Subscription();

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

    this.subscribeToService(
      this.vehiclesService.countAllVehicles(),
      'animatedNumVehicles',
    );
    this.subscribeToService(
      this.alertsService.countByStatus('pendiente'),
      'animatedNumAlerts',
    );
    this.subscribeToService(
      this.servicesService.countAllServices(),
      'animatedNumServices',
    );
    this.animateNumbers('animatedNumSavings', 1.3);
  }

  private subscribeToService(
    service$: Observable<number>,
    propertyToAnimate: NumericPropertyKeys,
  ) {
    this.subscriptions.add(
      service$.subscribe({
        next: (count: number) => {
          this.animateNumbers(propertyToAnimate, count);
        },
        error: (error: Error) =>
          console.error(`Failed when counting ${propertyToAnimate}`, error),
      }),
    );
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
          show: true,
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
