import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator-dashboard',
  templateUrl: './creator-dashboard.component.html',
  styleUrls: ['./creator-dashboard.component.css']
})
export class CreatorDashboardComponent implements OnInit {
  state: any = { };

  constructor() { }

  ngOnInit(): void {
    this.state.settingLevels = true;
  }

  getState(state: any) {
    this.state = state;
  }
}
