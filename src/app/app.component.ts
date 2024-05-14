import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatGridListModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}

  title = 'front-test';
}
