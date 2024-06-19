import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { RespApiAlerts } from '../../../interfaces/alerts/alerts.interface';

@Component({
  selector: 'app-lista-alertas',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-alertas.component.html',
  styleUrl: './lista-alertas.component.css',
})
export class ListaAlertasComponent implements OnInit, OnChanges {
  @Input() alerts: RespApiAlerts[] = [];
  dataSource: RespApiAlerts[] = [];

  displayedColumns: string[] = [
    'vehicle',
    'service',
    'date_end',
    'description',
  ];

  ngOnInit(): void {
    this.dataSource = this.alerts;
    console.log('datasourse lista -->', this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alerts']) {
      this.dataSource = changes['alerts'].currentValue || [];
    }
  }
}
