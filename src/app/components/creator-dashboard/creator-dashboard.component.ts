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
  numOfLevels: number = 1;

  game: Game = {
    name: "",
    seasonName: "",
    startDate: { year: 0, month: 0, day: 0 },
    endDate: { year: 0, month: 0, day: 0 },
    constructLink: "",
    levels: [{
      alchemerLink: "",
      millis: 0,
      imageLink: "",
      awards: []
    }]
  };

  validState: any = {
    validName: true,
    validSeasonName: true,
    validStartDate: true,
    validEndDate: true,
    validConstructLink: true,
    validLevels: true
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this._id = this.activatedRoute.snapshot.paramMap?.get('id');

      this.gameService.getGameById(this._id)
        .subscribe(res => {
            this.numOfLevels = res.levels.length;

            this.game.name = res.name;
            this.game.seasonName = res.seasonName;
            this.game.startDate = new Date(res.startDate.substring(0, 10));
            this.game.endDate = new Date(res.endDate.substring(0, 10));
            this.game.constructLink = res.constructLink;
            this.game.levels = res.levels;

            this.game.startDate = {
              year: +res.startDate.substring(0, 4),
              month: +res.startDate.substring(5, 7),
              day: +res.startDate.substring(8, 10)
            };

            this.game.endDate = {
              year: +res.endDate.substring(0, 4),
              month: +res.endDate.substring(5, 7),
              day: +res.endDate.substring(8, 10)
            };

          }, err => console.log(err));      
    }
  }

  updateLevelsArray() {
    if (this.numOfLevels > this.game.levels.length)
      this.game.levels.push({
        alchemerLink: "",
        millis: 0,
        imageLink: "",
        awards: []
      });
    else
      this.game.levels.pop();
  }

  setGame() {
    this.game.constructLink = "Water Sort";
  }

  validate(): boolean {
    if (this.game.name === "")
      this.validState.validName = false;
    else
      this.validState.validName = true;

    if (this.game.seasonName === "")
      this.validState.validSeasonName = false;
    else
      this.validState.validSeasonName = true;

    if (!this.game.startDate || !this.game.startDate.year || !this.game.startDate.month || !this.game.startDate.day )
      this.validState.validStartDate = false;
    else
      this.validState.validStartDate = true;

    if (!this.game.endDate || !this.game.endDate.year || !this.game.endDate.month || !this.game.endDate.day )
      this.validState.validEndDate = false;
    else
      this.validState.validEndDate = true;

    if (this.game.constructLink === "")
      this.validState.validConstructLink = false;
    else
      this.validState.validConstructLink = true;

    this.game.levels.forEach(level => {
      if (level.alchemerLink === "")
        this.validState.validLevels = false;
      else
        this.validState.validLevels = true;

      if (level.millis == 0)
        this.validState.validLevels = false;
      else
        this.validState.validLevels = true;

      if (level.imageLink === "")
        this.validState.validLevels = false;
      else
        this.validState.validLevels = true;
    });

    for (let prop in this.validState) {
      if (!this.validState[prop]) {
        console.log(prop);
        return false;
      }
    }

    return true;
  }

  onSubmit() {
    if (this.validate()) {
      if (this.activatedRoute.snapshot.paramMap.get('id')) {
        this.gameService.updateGame(this._id, this.game)
          .subscribe(res => console.log("Game object updated"), err => console.log(err));
      }
      else {
        this.gameService.createGame(this.game)
          .subscribe(res => console.log("Game object added to the db"), err => console.log(err));
      }

      this.router.navigate(["/dashboard-home"]);
    }
  }
}
