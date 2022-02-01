import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-millis-this-quest',
  templateUrl: './millis-this-quest.component.html',
  styleUrls: ['./millis-this-quest.component.css']
})
export class MillisThisQuestComponent implements OnInit {
  @Input() millis?: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
