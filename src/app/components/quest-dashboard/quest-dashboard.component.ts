import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.css']
})
export class QuestDashboardComponent implements OnInit {
  numOfLevels: number = 1;
  @Output() state: EventEmitter<object> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setNumOfLevels(event: any) {
    if (event.target.value)
      this.numOfLevels = event.target.value;
  }

  onNext() {
    this.state.emit({ levels: this.numOfLevels, settingLevels: false });
  }
}
