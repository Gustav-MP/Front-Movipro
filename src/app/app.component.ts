import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FirstFunxxxComponent } from './first-funxxx/first-funxxx.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FirstFunxxxComponent, MatGridListModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }

  title = 'front-test';
}
