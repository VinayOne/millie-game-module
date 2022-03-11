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
  //@ViewChild('iframeTag') iframeTag: ElementRef<any>;
  @Input() dashboardHeight: number = 0;
  answers: String[] = ["red", "blue", "yellow", "green"];

  iframeContent: SafeResourceUrl;

  public alchemerLink1 = 'https://survey.alchemer.com/s3/6697157/Where-is-Milli-Chapter-1';
  gameLink1 = 'https://brandon-earwood.github.io/water-sort/';

  name = 'gameArea';
  // loadHtml: any;

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
      imageLink: "",
      awards: [{ name: "", imageLink: "" }]
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

  constructor(private http: HttpClient, private gameService: GameService, private sanitizer: DomSanitizer) { 
    this.iframeContent = sanitizer.bypassSecurityTrustResourceUrl('https://c3.ideazz.com.pk/noman/watersort/index.html');
    // setTimeout(() => {
    //   this.changeUrl();
    // },500)
  }

  ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe(game => this.game = game, err => console.log(err));
    //let doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;

  }

  // loadExtWeb() {
  //   this.http
  //     .get('https://survey.alchemer.com/s3/6697157/Where-is-Milli-Chapter-1', { responseType: 'text' })
  //     .subscribe((res) => {
  //       this.loadHtml = this.sanitizer.bypassSecurityTrustHtml(res);
  //     });
  // }

  changeUrl() {
    let iframeArea: HTMLIFrameElement  = document.querySelector("#frameBox") as HTMLIFrameElement;
    let elem = iframeArea['contentWindow'];
    if (elem !== null) {
      console.log('iframe >>>>', elem);
    }
      
  }

  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    //let doc =  this.iframeTag.nativeElement.contentDocument || this.iframeTag.nativeElement.contentWindow;
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
