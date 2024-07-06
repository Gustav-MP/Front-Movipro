import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';

import { QrDocument } from '../../interfaces/gloveboxes/glovebox.interface';
import { QrService } from '../../services/qr/qr.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [
    CommonModule,
    MatAccordion,
    MatExpansionModule,
    MatIcon,
    MatList,
    MatListItem,
  ],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css',
})
export class QrComponent implements OnInit {
  public glovebox!: QrDocument[];
  public plate = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private qrService: QrService,
  ) {}

  tknQr: string = '';

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.plate = params.get('plate')!;
      this.tknQr = params.get('tkn')!;
      await this.getGlovebox(this.tknQr);
    });
  }

  async getGlovebox(tknQr: string) {
    try {
      this.glovebox = await lastValueFrom(
        this.qrService.getGloveBoxByQr(tknQr),
      );
    } catch (error) {
      console.error('Error fetching glovebox ny call QR', error);
    }
  }

  openDocument(url: string) {
    window.open(url, '_blank');
  }
}
