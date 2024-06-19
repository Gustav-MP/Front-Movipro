import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';
import { Credentials } from '../../interfaces/auth/credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(
    private httpclient: HttpClient,
    private storageService: StorageService,
  ) {}

  private baseUrl = environment.api.baseUrl;
  private apiServices = environment.api.services;

  private credentials: Credentials =
    this.storageService.getLocalStorage('credentials');

  private optionsAuth = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${this.credentials.tkn}`,
    },
  };

  countAllServices(): Observable<number> {
    const urlCountAlerts = `${this.baseUrl + this.apiServices.countByUser}`;
    return this.httpclient.get<number>(urlCountAlerts, this.optionsAuth).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in countAllServices -->', error);
        return throwError(() => new Error('Error when count services'));
      }),
    );
  }
}
