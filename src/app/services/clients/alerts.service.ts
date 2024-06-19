import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Credentials } from '../../interfaces/auth/credentials.interface';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private httpclient: HttpClient,
    private storageService: StorageService,
  ) {}

  private baseUrl = environment.api.baseUrl;
  private apiAlerts = environment.api.alerts;

  private credentials: Credentials =
    this.storageService.getLocalStorage('credentials');

  private optionsAuth = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${this.credentials.tkn}`,
    },
  };

  countByStatus(status: string): Observable<number> {
    const urlCountAlerts = `${this.baseUrl + this.apiAlerts.countByStatus}?status=${status}`;
    return this.httpclient.get<number>(urlCountAlerts, this.optionsAuth).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in countAllAlerts -->', error);
        return throwError(() => new Error('Error when count alerts'));
      }),
    );
  }

  getByUser(): Observable<any[]> {
    const urlGetAlertsByUser = `${this.baseUrl + this.apiAlerts.getByUser}`;
    return this.httpclient.get<any>(urlGetAlertsByUser, this.optionsAuth).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error when fetch alerts -->', error);
        return throwError(() => new Error('Error when fetch alerts'));
      }),
    );
  }
}
