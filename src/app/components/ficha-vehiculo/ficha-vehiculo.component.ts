import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { GuanteraComponent } from '../guantera/guantera.component';
import { GpsService } from '../../services/gps/gps.service';
import { GloveboxesService } from '../../services/clients/gloveboxes.service';

import { Vehicle } from '../../interfaces/vehicles/vehicle.interface';
import { Glovebox } from '../../interfaces/gloveboxes/glovebox.interface';

@Component({
  selector: 'app-ficha-vehiculo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    GuanteraComponent,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './ficha-vehiculo.component.html',
  styleUrl: './ficha-vehiculo.component.css',
})
export class FichaVehiculoComponent {
  private _vehicle!: Vehicle;
  public disclaimerAccepted = false;
  public panelOpenState = false;
  public comunas = [
    { name: 'Cerrillos' },
    { name: 'Cerro Navia' },
    { name: 'Conchalí' },
    { name: 'El Bosque' },
    { name: 'Estación Central' },
    { name: 'Huechuraba' },
    { name: 'Independencia' },
    { name: 'La Cisterna' },
    { name: 'La Florida' },
    { name: 'La Granja' },
    { name: 'La Pintana' },
    { name: 'La Reina' },
    { name: 'Las Condes' },
    { name: 'Lo Barnechea' },
    { name: 'Lo Espejo' },
    { name: 'Lo Prado' },
    { name: 'Macul' },
    { name: 'Maipú' },
    { name: 'Ñuñoa' },
    { name: 'Pedro Aguirre Cerda' },
    { name: 'Peñalolén' },
    { name: 'Providencia' },
    { name: 'Pudahuel' },
    { name: 'Puente Alto' },
    { name: 'Quilicura' },
    { name: 'Quinta Normal' },
    { name: 'Recoleta' },
    { name: 'Renca' },
    { name: 'San Joaquín' },
    { name: 'San Miguel' },
    { name: 'San Ramón' },
    { name: 'Santiago' },
    { name: 'Vitacura' },
  ];

  @Input()
  set vehicle(value: Vehicle) {
    this._vehicle = value;
    this.getGlovebox(value.id);
  }

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  public glovebox!: Glovebox;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private gpsService: GpsService,
    private gloveboxService: GloveboxesService,
  ) {}

  async getVehicleLastStatus(unitId: string) {
    try {
      const respLastPosition = await this.gpsService.getLastStatus(unitId);
      console.log('resplast position -->', respLastPosition);
    } catch (error) {
      console.error('Error fetching last position:', error);
    }
  }

  async getGlovebox(vehicleId: number) {
    try {
      this.glovebox = await lastValueFrom(
        this.gloveboxService.getGloveboxByVehicle(vehicleId),
      );
    } catch (error) {
      console.error('Error fetching last position:', error);
    }
  }

  async downloadDocument(pathDoc: string, nameDoc: string) {
    try {
      const docUrl = await lastValueFrom(
        this.gloveboxService.getFile(pathDoc, nameDoc),
      );
      console.log('docurl --->', docUrl.urlFile);
      window.open(docUrl.urlFile, '_blank');
    } catch (error) {
      console.error('Error fetching last position:', error);
    }
  }

  showDisclaimer() {
    const dialogRef = this.dialog.open(DialogContent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.disclaimerAccepted = true;
        this.showToast(
          'Solicitud enviada. Lo contactaremos para confirmar el servicio.',
        );
      } else {
        this.showToast('No se ha agendado el mantenimiento.');
      }
    });
  }

  showToast(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  styleUrl: './ficha-vehiculo.component.css',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContent {}
