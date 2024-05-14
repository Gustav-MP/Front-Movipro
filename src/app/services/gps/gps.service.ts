import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  private baseUrl = environment.api.baseUrl;

  constructor(private httpClient: HttpClient) {}

  async getLastStatus(Uid_vehicle: string): Promise<any> {
    const urlLastPosition = `${this.baseUrl}${environment.api.gps.getLastStatus}?uId=${Uid_vehicle}`;
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    const respLastPosition = await firstValueFrom(
      this.httpClient.get(urlLastPosition, options),
    );

    return respLastPosition;
  }
}
