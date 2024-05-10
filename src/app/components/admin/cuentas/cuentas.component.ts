import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../../../services/admin/admin.service';
import { Account } from '../../../interfaces/admin/accounts.interface';
import { Invoicing } from '../../../interfaces/admin/invoicing.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css',
})
export class CuentasComponent implements OnInit {
  subscriptions: Subscription[] = [];
  columnsToDisplay = ['empresa', 'rut', 'telefono', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Account | null;
  dataSource = new MatTableDataSource<Account>([]);
  invoicingInfo: Invoicing | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.adminService.getAllAccounts().subscribe({
        next: (accounts) => {
          this.dataSource.data = accounts;
          console.log('Accounts fetched:', accounts);
        },
        error: (error) => {
          console.error('Error fetching accounts:', error);
        },
      }),
    ];
  }

  toggleElement(account: Account) {
    if (this.expandedElement === account) {
      this.expandedElement = null;
      this.invoicingInfo = null;
    } else {
      if (this.expandedElement) {
        const existingSubIndex = this.subscriptions.findIndex(
          (sub) => sub.closed === false,
        );
        if (existingSubIndex !== -1) {
          this.subscriptions[existingSubIndex].unsubscribe();
          this.subscriptions.splice(existingSubIndex, 1);
        }
      }
      this.expandedElement = account;
      const subscription = this.adminService
        .getInvoicingByAccount(account.id)
        .subscribe({
          next: (invoicing) => {
            this.invoicingInfo = invoicing;
            console.log('Invoicing fetched:', invoicing);
          },
          error: (error) => {
            console.error('Error fetching invoicing:', error);
            this.invoicingInfo = null;
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }
}
