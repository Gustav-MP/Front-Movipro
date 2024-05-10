import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';
import { Account } from '../../interfaces/admin/accounts.interface';
import { Invoicing } from '../../interfaces/admin/invoicing.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  private options = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  constructor(private httpClient: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    const apiUrl = this.baseUrl + environment.api.admin.getAllAccounts;
    return this.httpClient.get<Account[]>(apiUrl, this.options);
  }

  getInvoicingByAccount(id_account: number): Observable<Invoicing> {
    const apiUrl =
      this.baseUrl +
      environment.api.admin.getInvoicingByAccount +
      '?id_account=' +
      id_account;
    return this.httpClient.get<Invoicing>(apiUrl, this.options);
  }
}
