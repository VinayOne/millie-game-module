import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../Game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-level-dashboard',
  templateUrl: './level-dashboard.component.html',
  styleUrls: ['./level-dashboard.component.css']
})
export class LevelDashboardComponent implements OnInit {
  @Input() state: any = { };

  radioSelected: string = "";
  millies: number = 0;
  imageLink: string = "";
  constructLink: string = "";

  levels: any[] = [];
  level: number = 1;
  numOfQuestions: number = 1;
  numOfRewards: number = 0;
  questions: any[] = [{ question: "", correct: "", answer: ["", "", "", ""] }];
  rewards: any[] = [{ name: "", imageLink: "" }];
  lastQuestion: boolean = false;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    if (this.level == this.state.numOfLevels)
      this.lastQuestion = true;
  }

  setGame() {
    this.constructLink = "Water Sort";
  }

  addLevel() {
    for (let index = 0; index < this.numOfQuestions; index++)
      this.questions[index].correct = this.questions[index].answer[this.radioSelected];

    this.levels[this.level - 1] = {
      questions: this.questions,
      millies: this.millies,
      rewards: this.rewards,
      imageLink: this.imageLink,
      constructLink: this.constructLink
    };
  }

  onNext() {
    this.addLevel();

    this.level++;
    this.numOfQuestions = 1;
    if (this.level == this.state.numOfLevels)
      this.lastQuestion = true;
  }

  onSubmit() {
    this.addLevel();

    this.state.levels = this.levels;

    this.gameService.createGame(this.state)
      .subscribe(res => console.log("Game object added to the db"), err => console.log(err));
  }
}
