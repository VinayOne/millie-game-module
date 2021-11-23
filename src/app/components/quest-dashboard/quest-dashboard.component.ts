import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.css']
})
export class QuestDashboardComponent implements OnInit {
  faCalendar: any = faCalendar;
  startDate: NgbDateStruct = { year: 0, month: 0, day: 0};
  endDate: NgbDateStruct = { year: 0, month: 0, day: 0};

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
      startDate: this.startDate,
      endDate: this.endDate,
      levels: this.levels,
      settingLevels: false
    });
  }
}
