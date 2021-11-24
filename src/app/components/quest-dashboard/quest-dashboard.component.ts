import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.css']
})
export class QuestDashboardComponent implements OnInit {
  faCalendar: any = faCalendar;
  startDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  endDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  name: string = "";
  seasonName: string = "";
  numOfLevels: number = 1;
  @Output() state: EventEmitter<object> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.state.emit({
      name: this.name,
      seasonName: this.seasonName,
      startDate: new Date(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`),
      endDate: new Date(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`),
      numOfLevels: this.numOfLevels,
      settingLevels: false
    });
  }
}
