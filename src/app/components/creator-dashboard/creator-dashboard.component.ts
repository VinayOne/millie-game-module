import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator-dashboard',
  templateUrl: './creator-dashboard.component.html',
  styleUrls: ['./creator-dashboard.component.css']
})
export class CreatorDashboardComponent implements OnInit {
  levels: number = 1;
  settingLevels: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getState(state: any) {
    this.levels = state.levels;
    this.settingLevels = state.settingLevels;
  }
}
