import { Component } from '@angular/core';
import { SecondFunxxxComponent } from '../second-funxxx/second-funxxx.component';

@Component({
  selector: 'app-first-funxxx',
  standalone: true,
  imports: [SecondFunxxxComponent],
  templateUrl: './first-funxxx.component.html',
  styleUrl: './first-funxxx.component.css'
})
export class FirstFunxxxComponent {
  name = 'Gustav';
  isLogged = false;
  favGame = '';

  greet() {
    alert('Hola ' + this.name);
  }

  getFav(gameName: string) {
    this.favGame = gameName;
  }
}
