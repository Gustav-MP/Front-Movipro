import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import {
  Credentials,
  PayloadJwt,
  RespLogin,
} from '../../interfaces/auth/credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.api.baseUrl;
  private apiAuth = environment.api.auth;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    const urlLogin = this.baseUrl + this.apiAuth.login;
    const options = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    const body = {
      email,
      password,
    };

    try {
      const response = await lastValueFrom(
        this.httpClient.post<RespLogin>(urlLogin, body, options),
      );
      const decodeJwt: PayloadJwt = jwtDecode(response.access_token);
      const credentials: Credentials = {
        tkn: response.access_token,
        iat: decodeJwt.iat,
        exp: decodeJwt.exp,
        user: {
          email: decodeJwt.email,
          id: decodeJwt.id,
          id_account: decodeJwt.id_account,
          name: decodeJwt.name,
          rol: decodeJwt.rol,
        },
      };
      const savedCredentials = await this.storageService.saveLocalStorage(
        'credentials',
        credentials,
      );
      return !!savedCredentials;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 400:
            throw new Error('Las credenciales no son válidas.');
          case 401:
            throw new Error('Las credenciales no son válidas.');
          default:
            throw new Error(
              'Error interno. Por favor contacte a su agente Movipro.',
            );
        }
      }
      throw error;
    }
  }

  //isLogged and userRole are exclusive for Guards, PLS BE CAREFULLY MTHFCKR!!!
  async isLogged(): Promise<boolean> {
    const storaged: Credentials =
      await this.storageService.getLocalStorage('credentials');
    if (!storaged) {
      return false;
    } else {
      const expDate = new Date(storaged.exp * 1000);
      return expDate > new Date();
    }
  }

  async userRole(): Promise<string> {
    const storaged: Credentials =
      await this.storageService.getLocalStorage('credentials');
    if (!storaged) {
      return 'noRole';
    } else {
      return storaged.user.rol;
    }
  }
}
