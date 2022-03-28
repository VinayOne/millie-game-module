import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef, HostListener  } from '@angular/core';
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
  //spotDiffImages: any = [];
  totalLevels: number = 0;
  currentLevel: number = 0;

  element: any;
  iframe: any;

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
    }],
    finalAlchemerLink: ""
  };


  gameState: any = {
    currentLevel: 0,
    currentQuestion: 0,
    radioSelected: "",
    answeringQuestions: true,
    spottingTheDifference: false,
    playingConstructGame: false
  };

  constructor(private http: HttpClient, private gameService: GameService, private sanitizer: DomSanitizer) {     
    window.addEventListener('message', (event) => {
	  if(event.data === 'chapterOne' || event.data === 'chapterTwo' || event.data === 'chapterThree' || event.data === 'chapterFour') {
      console.log('message received: ', event.data);
      // next redirect to game url
      const gameUrl = 'https://sancharseva.com/lets-ask-milli/water-sort/';
      setTimeout(() => {
        this.loadQuest(gameUrl);
      },5000)
		  }
    });
  }

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
          this.loadQuest(this.alchemerLinks[0]);
        },      
      err => console.log(err));
  };

  loadQuest(content: any): void {
    this.iframeContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
  };


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
