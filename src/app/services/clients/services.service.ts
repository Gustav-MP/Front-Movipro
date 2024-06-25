import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private httpclient: HttpClient) {}

  private baseUrl = environment.api.baseUrl;
  private apiServices = environment.api.services;

  countAllServices(): Observable<number> {
    const urlCountAlerts = `${this.baseUrl + this.apiServices.countByUser}`;
    return this.httpclient.get<number>(urlCountAlerts).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in countAllServices -->', error);
        return throwError(() => new Error('Error when count services'));
      }),
    );
  }
}
