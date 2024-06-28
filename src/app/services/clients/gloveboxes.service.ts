import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Document,
  Glovebox,
} from '../../interfaces/gloveboxes/glovebox.interface';

@Injectable({
  providedIn: 'root',
})
export class GloveboxesService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.api.baseUrl;
  private apiGlovebox = environment.api.glovebox;

  getGloveboxByVehicle(id: number): Observable<Glovebox> {
    const urlGlovebox = `${this.baseUrl + this.apiGlovebox.getByType}?type=vehiculo&typeId=${id}`;
    return this.httpClient.get<Glovebox>(urlGlovebox).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getGloveboxByVehicle -->', error);
        return throwError(() => new Error('Error when get glovebox'));
      }),
    );
  }

  getFile(route: string, nameFile: string): Observable<{ urlFile: string }> {
    const key = `${route}/${nameFile}`;
    const urlGlovebox = `${this.baseUrl + this.apiGlovebox.getFile}?key=${key}`;
    return this.httpClient.get<{ urlFile: string }>(urlGlovebox).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in getGloveboxByVehicle -->', error);
        return throwError(() => new Error('Error when get glovebox'));
      }),
    );
  }

  uploadFile(
    file: File,
    path: string,
    documentId: number,
  ): Observable<Document> {
    const urlUploadFile = this.baseUrl + this.apiGlovebox.uploadFile;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', path);
    formData.append('documentId', documentId.toString());
    return this.httpClient.post<any>(urlUploadFile, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error in uploadFile -->', error);
        return throwError(() => new Error('Error when try upload file'));
      }),
    );
  }
}
