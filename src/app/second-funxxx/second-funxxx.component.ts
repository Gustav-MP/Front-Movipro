import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-second-funxxx',
  standalone: true,
  imports: [],
  templateUrl: './second-funxxx.component.html',
  styleUrl: './second-funxxx.component.css'
})
export class SecondFunxxxComponent {
  @Input() username: string = '';
  @Output() addFavoriteEvent = new EventEmitter<string>

  games = [
    {
      id: 1,
      name: 'Command and Conquer'
    },
    {
      id: 2,
      name: 'Age of Empire'
    }
  ]

  addFav(gameName: string) {
    this.addFavoriteEvent.emit(gameName);
    console.log('te gusta el ' + gameName);
  }
}
