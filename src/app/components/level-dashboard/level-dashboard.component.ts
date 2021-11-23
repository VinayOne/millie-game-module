import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-dashboard',
  templateUrl: './level-dashboard.component.html',
  styleUrls: ['./level-dashboard.component.css']
})
export class LevelDashboardComponent implements OnInit {
  @Input() state: any = { };

  radioSelected: string = "";
  millies: number = 0;
  image: string = "";
  constructGame: string = "";

  levels: any[] = [];
  level: number = 1;
  numOfQuestions: number = 1;
  questions: any[] = [{ question: "", correct: "", answer: ["", "", "", ""] }];
  lastQuestion: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  counter() {
    return new Array(this.numOfQuestions);
  }

  setGame() {
    this.constructGame = "Water Sort";
  }

  onNext() {
    console.log(this.constructGame);

    for (let index = 0; index < this.numOfQuestions; index++)
      this.questions[index].correct = this.questions[index].answer[this.radioSelected];

    this.levels[this.level - 1] = {
      questions: this.questions,
      millies: this.millies,
      image: this.image,
      constructGame: this.constructGame
    };

    this.level++;
    this.numOfQuestions = 1;
    if (this.level == this.state.levels)
      this.lastQuestion = true;
  }

  onSubmit() {

  }
}
