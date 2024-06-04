import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import {
  Credentials,
  UserCredentials,
} from '../../interfaces/auth/credentials.interface';

import { MatGridListModule } from '@angular/material/grid-list';
import { ApexStroke, NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { VehiclesService } from '../../services/clients/vehicles.service';
import { Vehicle } from '../../interfaces/vehicles/vehicle';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
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
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Servicios',
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
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: '',
      },
      stroke: {
        width: [4, 4, 4],
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
    };
  }

  async ngOnInit(): Promise<void> {
    const credentialsData: Credentials =
      await this.storageService.getLocalStorage('credentials');
    this.userData = credentialsData.user;

    this.subscriptions.add(
      this.vehiclesService.getAllVehicles().subscribe({
        next: (vehicles) => {
          this.animateNumbers('animatedNumVehicles', vehicles.length, 800);
          this.animateNumbers('animatedNumAlerts', 3, 800);
          this.animateNumbers('animatedNumServices', 23, 1000);
          this.animateNumbers('animatedNumSavings', 1.3, 1000);
        },
        error: (error) => console.error('Failed to fetch vehicles:', error),
      }),
    );
  }

  private animateNumbers(
    propertyToAnimate: NumericPropertyKeys,
    finalNumber: number,
    duration: number,
  ) {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
