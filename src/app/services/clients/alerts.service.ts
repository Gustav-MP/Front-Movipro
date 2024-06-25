import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private httpclient: HttpClient) {}

  private baseUrl = environment.api.baseUrl;
  private apiAlerts = environment.api.alerts;

  countByStatus(status: string): Observable<number> {
    const urlCountAlerts = `${this.baseUrl + this.apiAlerts.countByStatus}?status=${status}`;
    return this.httpclient.get<number>(urlCountAlerts).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in countAllAlerts -->', error);
        return throwError(() => new Error('Error when count alerts'));
      }),
    );
  }

  getByUser(): Observable<any[]> {
    const urlGetAlertsByUser = `${this.baseUrl + this.apiAlerts.getByUser}`;
    return this.httpclient.get<any>(urlGetAlertsByUser).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error when fetch alerts -->', error);
        return throwError(() => new Error('Error when fetch alerts'));
      }),
    );
  }
}
