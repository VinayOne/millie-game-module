import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-millies-this-quest',
  templateUrl: './millies-this-quest.component.html',
  styleUrls: ['./millies-this-quest.component.css']
})
export class MilliesThisQuestComponent implements OnInit {
  @Input() millies?: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
