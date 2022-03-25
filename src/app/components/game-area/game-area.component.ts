import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { GameService } from '../../services/game.service';
import { Game } from '../../Game';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {
  @Input() dashboardHeight: number = 0;
  answers: String[] = ["red", "blue", "yellow", "green"];

  iframeContent: SafeResourceUrl = '';
  alchemerLinks: any = [];
  spotDiffImages: any = [];
  totalLevels: number = 0;
  currentLevel: number = 0;

  game: Game = {
    _id: "",
    name: "",
    seasonName: "",
    startDate: "",
    endDate: "",
    constructLink: "",
    levels: [{
      alchemerLink: "",
      millis: 0,
      // imageLink: "",
      // awards: [{ name: "", imageLink: "" }]
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

  constructor(private http: HttpClient, private gameService: GameService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCurrentGame();
  }

  getCurrentGame() {
    this.gameService.getCurrentGame()
      .subscribe(
        game => { 
          this.game = game;
          this.alchemerLinks = this.game.levels.map(link => {
            return link.alchemerLink;
          });
          // this.spotDiffImages = this.game.levels.map(link => {
          //   return link.imageLink;
          // });
          this.totalLevels = this.alchemerLinks.length;
          this.loadQuest();
        },      
      err => console.log(err));
  };

  loadQuest() {
    const content = this.alchemerLinks[0];
    this.iframeContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
  };

  getAlert() {
    console.log('clicked from iframe');
  }

  gameOver(){

  }


  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    
  }

  updateState() {
    if (this.gameState.answeringQuestions) {
      if (this.gameState.currentQuestion < 3)
        this.gameState.currentQuestion++;
      else {
        this.gameState.answeringQuestions = false;
        this.gameState.playingConstructGame = true;
      }
    }


  }
}
