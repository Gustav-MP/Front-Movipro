import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { Credentials } from '../../interfaces/auth/credentials.interface';
import { Fleet, Vehicle } from '../../interfaces/vehicles/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private baseUrl = environment.api.baseUrl;
  private apiFleets = environment.api.fleets;
  private apiVehicles = environment.api.vehicles;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {}

  private credentials: Credentials =
    this.storageService.getLocalStorage('credentials');

  private optionsAuth = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${this.credentials.tkn}`,
    },
  };

  async getAllFleets() {
    const urlFleets = this.baseUrl + this.apiFleets.getAllFleets;
    try {
      const respFleets = await lastValueFrom(
        this.httpClient.get<Fleet[]>(urlFleets, this.optionsAuth),
      );
      return respFleets;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 400:
            throw new Error('No existen flotas asociadas');
          case 401:
            throw new Error('Token expirado, debes hacer loggin');
          default:
            throw new Error(
              'Error interno. Por favor contacte a su agente Movipro.',
            );
        }
      }
      throw error;
    }
  }

  async getVehiclesByFleet(fleet_id: number) {
    const urlVehiclesByFleet = `${this.baseUrl + this.apiVehicles.getByFleet}?fleet_id=${fleet_id}`;

    try {
      const respVehicles = await firstValueFrom(
        this.httpClient.get<Vehicle[]>(urlVehiclesByFleet, this.optionsAuth),
      );
      return respVehicles;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 400:
            throw new Error(
              'El usuario no tiene vehiculos o flotas asociados.',
            );
          case 401:
            throw new Error('Token expirado, debes hacer loggin');
          default:
            throw new Error(
              'Error interno. Por favor contacte a su agente Movipro.',
            );
        }
      }
      throw error;
    }
  }
}
