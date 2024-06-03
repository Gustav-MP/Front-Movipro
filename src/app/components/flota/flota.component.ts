import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FichaVehiculoComponent } from '../ficha-vehiculo/ficha-vehiculo.component';
import { CommonModule } from '@angular/common';
import { VehiclesService } from '../../services/clients/vehicles.service';
import { Vehicle } from '../../interfaces/vehicles/vehicle';

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
export class FlotaComponent implements AfterViewInit, OnInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehicleService: VehiclesService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  async ngOnInit(): Promise<void> {
    const respFleets = await this.vehicleService.getAllFleets();
    if (respFleets.length === 1) {
      const vehicles = await this.vehicleService.getVehiclesByFleet(
        respFleets[0].id,
      );
      console.log('vehicles -->', vehicles);
      this.dataSource.data = vehicles; // Actualiza los datos del dataSource
    }
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
}
