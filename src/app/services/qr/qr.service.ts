import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { QrDocument } from '../../interfaces/gloveboxes/glovebox.interface';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.api.baseUrl;
  private apiQr = environment.api.qr;

  getGloveBoxByQr(tknQr: string): Observable<QrDocument[]> {
    const urlQrGlovebox = this.baseUrl + this.apiQr.getGlovebox;
    return this.httpClient.post<QrDocument[]>(urlQrGlovebox, { tknQr }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getGloveBoxByQr -->', error);
        return throwError(
          () => new Error('Error when get glovebox in thr QR call'),
        );
      }),
    );
  }
}
