import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'millie-game-module';
  height: number = 0;

  getHeight(height: number) {
    this.height = height;
  }
}
