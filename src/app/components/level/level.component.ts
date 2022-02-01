import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  @Input() index: number = 0;
  @Input() level: any = {};
  numOfAwards: number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }
}
