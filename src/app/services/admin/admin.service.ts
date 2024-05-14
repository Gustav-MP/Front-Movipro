import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Account } from '../../interfaces/admin/accounts.interface';
import { Invoicing } from '../../interfaces/admin/invoicing.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.api.baseUrl;
  private apiAdmin = environment.api.admin;
  private options = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  constructor(private httpClient: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    const urlgetAllAccounts = `${this.baseUrl}${this.apiAdmin.getAllAccounts}`;
    return this.httpClient.get<Account[]>(urlgetAllAccounts, this.options);
  }

  getInvoicingByAccount(id_account: number): Observable<Invoicing> {
    const urlgetInvoicing = `${this.baseUrl}${this.apiAdmin.getInvoicingByAccount}?id_account=${id_account}`;
    return this.httpClient.get<Invoicing>(urlgetInvoicing, this.options);
  }
}
