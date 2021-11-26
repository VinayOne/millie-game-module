import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../Game';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {
  @Input() dashboardHeight: number = 0;
  game: Game = {
    name: "",
    seasonName: "",
    startDate: {},
    endDate: {},
    levels: [{
      questions: [{ question: "", correct: "", answer: [""] }],
      millies: 0,
      imageLink: "", constructLink: "",
      rewards: [{ name: "", imageLink: "" }]
    }]
  };

  gameState: any = {
    currentLevel: 0,
    currentQuestion: 0,
    radioSelected: "",
    answeringQuestions: true,
    spottingTheDifference: false,
    playingConstructGame: false
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGame().subscribe(game => {
      this.game = game;
    });
  }

  ngAfterContentChecked() {

  }

  updateState() {
    if (this.gameState.answeringQuestions) {
      if (this.gameState.currentQuestion < this.game.levels[this.gameState.currentLevel].questions.length - 1)
        this.gameState.currentQuestion++;
      else {
        this.gameState.answeringQuestions = false;
        this.gameState.playingConstructGame = true;
      }
    }


  }
}
