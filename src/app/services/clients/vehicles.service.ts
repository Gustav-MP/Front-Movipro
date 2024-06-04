import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';

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

  getAllFleets(): Observable<Fleet[]> {
    const urlFleets = this.baseUrl + this.apiFleets.getAllFleets;
    return this.httpClient.get<Fleet[]>(urlFleets, this.optionsAuth).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getAllFleets -->', error);
        return throwError(() => new Error('Error fetching fleets'));
      }),
    );
  }

  getVehiclesByFleet(fleet_id: number): Observable<Vehicle[]> {
    const urlVehiclesByFleet = `${this.baseUrl + this.apiVehicles.getByFleet}?fleet_id=${fleet_id}`;
    return this.httpClient
      .get<Vehicle[]>(urlVehiclesByFleet, this.optionsAuth)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('error in getVehiclesByFleet -->', error);
          return throwError(
            () => new Error('Error fetching vehicles for fleet'),
          );
        }),
      );
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.getAllFleets().pipe(
      switchMap((fleets) => {
        if (fleets.length === 0) {
          return throwError(
            () => new Error('No hay flotas asociadas al usuario'),
          );
        }
        return forkJoin(
          fleets.map((fleet) => this.getVehiclesByFleet(fleet.id)),
        ).pipe(
          map((vehiclesArrays) => vehiclesArrays.flat()),
          catchError((error) => {
            console.error('Failed to fetch vehicles:', error);
            return throwError(() => error);
          }),
        );
      }),
      catchError((error) => {
        console.error('Failed during fleet retrieval:', error);
        return throwError(() => error);
      }),
    );
  }
}
