import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FichaVehiculoComponent } from '../ficha-vehiculo/ficha-vehiculo.component';
import { CommonModule } from '@angular/common';


export interface Vehicle {
  id: string;
  patente: string;
  chasis: string;
  marca: string;
  modelo: string;
  region: string;
  empresa: string;
  ultima_mantencion: string;
  proxima_mantencion: string;
  ultima_revision: string;
  proxima_revision: string;
  mantenimiento: string;
  status: string;
  conductor: string;
  kms: string;
  siniestros: number;
  docs: Document[];
  plan_contratado: string;
}

export interface Document {
  nombre: string;
  url: string;
  fecha: string;
}

const ELEMENT_DATA: Vehicle[] = [
  {
    id: '1',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '27/01/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '10/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '15/01/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '23/01/2023' }
    ],
    patente: 'RRCX35',
    chasis: '1HGCM82633A508642',
    modelo: 'N400',
    region: 'Metropolitana',
    marca: 'Chevrolet',
    empresa: 'Mercadolibre',
    mantenimiento: 'General',
    ultima_mantencion: '18/04/2023',
    proxima_mantencion: '18/04/2024',
    ultima_revision: '08/2023',
    proxima_revision: '08/2024',
    status: 'Pendiente',
    conductor: 'Sofía González',
    kms: '83.000',
    siniestros: 5,
    plan_contratado: 'Inicia'
  },
  {
    id: '2',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '07/02/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '10/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '01/03/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '08/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '13/03/2023' }
    ],
    patente: 'TVCQ68',
    chasis: '3FAHP0HA5CR107985',
    modelo: 'Cargo',
    region: 'Metropolitana',
    marca: 'DFSK',
    empresa: 'San Camilo',
    mantenimiento: 'General',
    ultima_mantencion: '09/08/2022',
    proxima_mantencion: '09/08/2024',
    ultima_revision: '08/2023',
    proxima_revision: '08/2024',
    status: 'Ok',
    conductor: 'David Martínez',
    kms: '65.000',
    siniestros: 8,
    plan_contratado: 'Inicia'
  },
  {
    id: '3',
    docs: [
      { nombre: 'SOAP', url: 'https://drive.google.com/file/d/1fOx2gwzIQi_ONVbS_rsJ6QZYgJhQw1X7/view?usp=sharing', fecha: '09/01/2024' },
      { nombre: 'Permiso circulación', url: 'https://drive.google.com/file/d/1nTIFkoeQ1ESmsoDTUp9-6diEnwbUOXHu/view?usp=sharing', fecha: '16/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '12/02/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '23/02/2023' }
    ],
    patente: 'AOXE46',
    chasis: '2FMGK5BC9EB906857',
    modelo: 'Vito',
    region: 'Valparaiso',
    marca: 'Mercedes-Benz',
    empresa: 'Mercadolibre',
    mantenimiento: 'Caja de Cambio',
    ultima_mantencion: '01/12/2022',
    proxima_mantencion: '01/12/2024',
    ultima_revision: '12/2023',
    proxima_revision: '12/2024',
    status: 'Ok',
    conductor: 'Laura Sánchez',
    kms: '74.000',
    siniestros: 8,
    plan_contratado: 'Inicia'
  },
  {
    id: '4',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '30/03/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '14/01/2024' },
      { nombre: 'Padrón', url: '', fecha: '19/03/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '13/03/2023' }
    ],
    patente: 'HLUT59',
    chasis: '5XYZT3LB2GG805436',
    modelo: 'Partner',
    region: 'Metropolitana',
    marca: 'Peugeot',
    empresa: 'Yanguas',
    mantenimiento: 'Otros',
    ultima_mantencion: '25/09/2021',
    proxima_mantencion: '25/03/2024',
    ultima_revision: '08/2023',
    proxima_revision: '08/2024',
    status: 'Rechazado',
    conductor: 'Ana Torres',
    kms: '71.000',
    siniestros: 1,
    plan_contratado: 'Inicia'
  },
  {
    id: '5',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '03/03/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '20/02/2024' },
      { nombre: 'Padrón', url: '', fecha: '25/01/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '28/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '03/01/2023' }
    ],
    patente: 'GOVC80',
    chasis: '1G1ZE5ST6GF704123',
    modelo: 'Cargo',
    region: 'Valparaiso',
    marca: 'DFSK',
    empresa: 'Mercadolibre',
    mantenimiento: 'Caja de Cambio',
    ultima_mantencion: '08/08/2021',
    proxima_mantencion: '08/08/2024',
    ultima_revision: '08/2023',
    proxima_revision: '08/2024',
    status: 'Pendiente',
    conductor: 'Lucía López',
    kms: '69.000',
    siniestros: 7,
    plan_contratado: 'Inicia'
  },
  {
    id: '6',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '07/02/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '10/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '01/03/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '08/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '13/03/2023' }
    ],
    patente: 'ZKWJ36',
    chasis: '2T3WFREV5FW603912',
    modelo: 'Partner',
    region: 'Metropolitana',
    marca: 'Peugeot',
    empresa: 'Mercadolibre',
    mantenimiento: 'General',
    ultima_mantencion: '13/04/2023',
    proxima_mantencion: '13/04/2024',
    ultima_revision: '04/2023',
    proxima_revision: '04/2024',
    status: 'Rechazado',
    conductor: 'Luis Rodríguez',
    kms: '39.000',
    siniestros: 4,
    plan_contratado: 'Inicia'
  },
  {
    id: '7',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '27/01/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '10/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '15/01/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '30/01/2023' }
    ],
    patente: 'CBYG70',
    chasis: '4T1BF1FK5GU502678',
    modelo: 'Vito',
    region: 'Metropolitana',
    marca: 'Mercedes-Benz',
    empresa: 'San Camilo',
    mantenimiento: 'Otros',
    ultima_mantencion: '01/05/2023',
    proxima_mantencion: '01/05/2024',
    ultima_revision: '09/2023',
    proxima_revision: '09/2024',
    status: 'Ok',
    conductor: 'David Martínez',
    kms: '82.000',
    siniestros: 3,
    plan_contratado: 'Inicia'
  },
  {
    id: '8',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '03/03/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '20/02/2024' },
      { nombre: 'Padrón', url: '', fecha: '25/01/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '28/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '15/01/2023' }
    ],
    patente: 'GXGJ52',
    chasis: '3N1AB7AP7KY301456',
    modelo: 'N400',
    region: 'Metropolitana',
    marca: 'Chevrolet',
    empresa: 'Yanguas',
    mantenimiento: 'Otros',
    ultima_mantencion: '12/06/2023',
    proxima_mantencion: '12/06/2024',
    ultima_revision: '11/2023',
    proxima_revision: '11/2024',
    status: 'Ok',
    conductor: 'Ana Torres',
    kms: '34.000',
    siniestros: 5,
    plan_contratado: 'Inicia'
  },
  {
    id: '9',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '30/03/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '14/01/2024' },
      { nombre: 'Padrón', url: '', fecha: '19/03/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '09/03/2023' }
    ],
    patente: 'EDLR04',
    chasis: '1FTEX1EP4GKF10234',
    modelo: 'Berlingo',
    region: 'Metropolitana',
    marca: 'Citroen',
    empresa: 'Mercadolibre',
    mantenimiento: 'Caja de Cambio',
    ultima_mantencion: '26/10/2012',
    proxima_mantencion: '26/10/2014',
    ultima_revision: '12/2023',
    proxima_revision: '12/2024',
    status: 'Pendiente',
    conductor: 'Ana Torres',
    kms: '99.000',
    siniestros: 9,
    plan_contratado: 'Inicia'
  },
  {
    id: '10',
    docs: [
      { nombre: 'SOAP', url: '', fecha: '09/01/2024' },
      { nombre: 'Permiso circulación', url: '', fecha: '16/03/2024' },
      { nombre: 'Padrón', url: '', fecha: '12/02/2024' },
      { nombre: 'Seguro asociado', url: '', fecha: '18/04/2021' },
      { nombre: 'Cert. Mantención', url: '', fecha: '23/02/2023' }
    ],
    patente: 'IJKS70',
    chasis: '5YJ3E1EA7HF000316',
    modelo: 'Partner',
    region: 'Metropolitana',
    marca: 'Peugeot',
    empresa: 'Yanguas',
    mantenimiento: 'General',
    ultima_mantencion: '03/04/2023',
    proxima_mantencion: '03/04/2024',
    ultima_revision: '04/2023',
    proxima_revision: '04/2024',
    status: 'Ok',
    conductor: 'Manuel Gómez',
    kms: '82.000',
    siniestros: 1,
    plan_contratado: 'Inicia'
  },
];

@Component({
  selector: 'app-flota',
  standalone: true,
  imports: [
    CommonModule,
    FichaVehiculoComponent,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './flota.component.html',
  styleUrl: './flota.component.css'
})


export class FlotaComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'patente',
    'marca',
    'modelo',
    'region',
    'empresa',
    'mantenimiento',
    'proxima_mantencion',
    'status'
  ];
  dataSource: MatTableDataSource<Vehicle>;
  selectedVehicle: Vehicle | null = null;
  selectedRowIndex: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

}
