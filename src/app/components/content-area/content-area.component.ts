import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {
  public height: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getHeight(height: number) {
    this.height = height;
  }
}
