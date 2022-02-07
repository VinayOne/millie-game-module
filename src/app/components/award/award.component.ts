import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {
  @Input() index: number = 0;
  @Input() award: any = {};
  @Input() validState: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
