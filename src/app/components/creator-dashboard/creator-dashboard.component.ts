import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../Game';
import { GameService } from '../../services/game.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creator-dashboard',
  templateUrl: './creator-dashboard.component.html',
  styleUrls: ['./creator-dashboard.component.css']
})
export class CreatorDashboardComponent implements OnInit {
  _id: any = {};

  faCalendar: any = faCalendar;
  startDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  endDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  numOfLevels: number = 1;
  numOfRewards: number = 0;

  game: Game = {
    name: "",
    seasonName: "",
    startDate: this.startDate,
    endDate: this.endDate,
    levels: [{
      alchemerLink: "",
      millies: 0,
      imageLink: "",
      constructLink: "",
      rewards: [{
        name: "",
        imageLink: ""
      }]
    }]
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this._id = this.activatedRoute.snapshot.paramMap?.get('id');

      this.gameService.getGameById(this._id)
        .subscribe(res => this.game = res, err => console.log(err));
    }
  }

  setGame(levelIndex: number) {
    this.game.levels[levelIndex].constructLink = "Water Sort";
  }

  onSubmit() {
    if (this.activatedRoute.snapshot.paramMap.get('id'))
      this.gameService.updateGame(this.game)
        .subscribe(res => console.log("Game object updated"), err => console.log(err));
    else
      this.gameService.createGame(this.game)
        .subscribe(res => console.log("Game object added to the db"), err => console.log(err));

    this.router.navigate(["/dashboard-home"]);
  }
}
