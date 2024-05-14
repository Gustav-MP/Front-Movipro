import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.api.baseUrl;
  private apiAuth = environment.api.auth;

  constructor(private httpClient: HttpClient) {}

  getUser(id_user: number): Observable<any> {
    const urlgetUser = `${this.baseUrl}${this.apiAuth.getUser}?id=${id_user}`;
    const options = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    return this.httpClient.get(urlgetUser, options);
  }
}
