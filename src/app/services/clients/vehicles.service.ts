import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Fleet, Vehicle } from '../../interfaces/vehicles/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.api.baseUrl;
  private apiFleets = environment.api.fleets;
  private apiVehicles = environment.api.vehicles;

  getAllFleets(): Observable<Fleet[]> {
    const urlFleets = this.baseUrl + this.apiFleets.getByUser;
    return this.httpClient.get<Fleet[]>(urlFleets).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getAllFleets -->', error);
        return throwError(() => new Error('Error fetching fleets'));
      }),
    );
  }

  getVehiclesByFleet(fleet_id: number): Observable<Vehicle[]> {
    const urlVehiclesByFleet = `${this.baseUrl + this.apiVehicles.getByFleet}?fleet_id=${fleet_id}`;
    return this.httpClient.get<Vehicle[]>(urlVehiclesByFleet).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getVehiclesByFleet -->', error);
        return throwError(() => new Error('Error fetching vehicles for fleet'));
      }),
    );
  }

  countAllVehicles(): Observable<number> {
    const urlCountVehicles = `${this.baseUrl + this.apiVehicles.countByUser}`;
    return this.httpClient.get<number>(urlCountVehicles).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in countAllVehicles -->', error);
        return throwError(() => new Error('Error when count vehicles'));
      }),
    );
  }
}
