import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FichaVehiculoComponent } from '../ficha-vehiculo/ficha-vehiculo.component';
import { CommonModule } from '@angular/common';
import { VehiclesService } from '../../services/clients/vehicles.service';
import { Vehicle } from '../../interfaces/vehicles/vehicle.interface';
import { Subscription } from 'rxjs';

let ELEMENT_DATA: Vehicle[] = [];

@Component({
  selector: 'app-flota',
  standalone: true,
  imports: [
    CommonModule,
    FichaVehiculoComponent,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './flota.component.html',
  styleUrl: './flota.component.css',
})
export class FlotaComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = [
    'patente',
    'marca',
    'modelo',
    'proxima_rt',
    'estado_vehiculo',
  ];
  dataSource: MatTableDataSource<Vehicle>;
  selectedVehicle: Vehicle | null = null;
  selectedRowIndex: number | null = null;

  private subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehicleService: VehiclesService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  async ngOnInit(): Promise<void> {
    this.subscriptions.add(
      this.vehicleService.getAllFleets().subscribe({
        next: (fleets) => {
          if (fleets.length > 0) {
            this.loadVehicles(fleets[0].id);
          }
        },
        error: (error) => console.error('Error fetching fleets:', error),
      }),
    );
  }

  loadVehicles(fleetId: number) {
    this.subscriptions.add(
      this.vehicleService.getVehiclesByFleet(fleetId).subscribe({
        next: (vehicles) => {
          this.dataSource.data = vehicles;
          console.log('vehicles -->', vehicles);
        },
        error: (error) => console.error('Error fetching vehicles:', error),
      }),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pickedVehicle(vehicle: Vehicle, index: number) {
    this.selectedRowIndex = index;
    this.selectedVehicle = vehicle;
  }

  addYear(date: Date): Date {
    const formattedDate = new Date(date);
    return new Date(formattedDate.setFullYear(formattedDate.getFullYear() + 1));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
