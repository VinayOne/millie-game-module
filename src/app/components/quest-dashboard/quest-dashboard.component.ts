import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.css']
})
export class QuestDashboardComponent implements OnInit {
  questName: string = "";
  seasonName: string = "";
  levels: number = 1;
  @Output() state: EventEmitter<object> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.state.emit({
      questName: this.questName,
      seasonName: this.seasonName,
      levels: this.levels,
      settingLevels: false
    });
  }
}
