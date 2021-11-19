import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-dashboard',
  templateUrl: './level-dashboard.component.html',
  styleUrls: ['./level-dashboard.component.css']
})
export class LevelDashboardComponent implements OnInit {
  @Input() numOfLevels: number = 1;
  level: number = 1;
  numOfQuestions: number = 1;
  lastQuestion: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setNumOfQuestions(event: any) {
    this.numOfQuestions = event.target.value;
  }

  counter() {
    return new Array(this.numOfQuestions);
  }

  onNext() {
    this.level++;

    if (this.level == this.numOfLevels)
      this.lastQuestion = true;
  }

  onSubmit() {

  }
}
