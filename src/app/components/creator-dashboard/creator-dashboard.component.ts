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

  games: Game[] = [];

  game: Game = {
    name: "",
    seasonName: "",
    startDate: { year: 0, month: 0, day: 0 },
    endDate: { year: 0, month: 0, day: 0 },
    constructLink: "",
    levels: [{
      alchemerLink: "",
      millis: 0
     // imageLink: "",
     // awards: []
    }]
  };

  validState: any = {
    validName: true,
    validSeasonName: true,
    validStartDate: true,
    validEndDate: true,
    validDatesForGame: true,
    validDatesForAllGames: true,
    validConstructLink: true,
    validLevels: [{
      validAlchemerLink: true,
      validMillis: true
      // validImageLink: true,
      // validAwards: []
    }]
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });

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

            this.validState.validLevels = Array(this.numOfLevels).fill({
              validAlchemerLink: true,
              validMillis: true
              // validImageLink: true,
              // validAwards: []
            });

          }, err => console.log(err));      
    }
  }

  updateLevelsArray() {
    if (this.numOfLevels > this.game.levels.length) {
      this.game.levels.push({
        alchemerLink: "",
        millis: 0
        // imageLink: "",
        // awards: []
      });

      this.validState.validLevels.push({
        validAlchemerLink: true,
        validMillis: true
        // validImageLink: true,
        // validAwards: []
      });
    }
    else {
      this.game.levels.pop();
      this.validState.validLevels.pop();
    }
  }

  setGame() {
    this.game.constructLink = "Water Sort";
  }

  compareDates(firstDate: any, secondDate: any) {
    if (typeof firstDate === "string") {
      if (Number(firstDate.substring(0, 4)) < secondDate.year)
        return -1;
      else if (Number(firstDate.substring(0, 4)) > secondDate.year)
        return 1;

      if (Number(firstDate.substring(5, 7)) < secondDate.month)
        return -1;
      else if (Number(firstDate.substring(5, 7)) > secondDate.month)
        return 1;

      if (Number(firstDate.substring(8, 10)) < secondDate.day)
        return -1;
      else if (Number(firstDate.substring(8, 10)) > secondDate.day)
        return 1;

      return 0;
    }

    if (typeof secondDate === "string") {
      if (firstDate.year < Number(secondDate.substring(0, 4)))
        return -1;
      else if (firstDate.year > Number(secondDate.substring(0, 4)))
        return 1;

      if (firstDate.month < Number(secondDate.substring(5, 7)))
        return -1;
      else if (firstDate.month > Number(secondDate.substring(5, 7)))
        return 1;

      if (firstDate.day < Number(secondDate.substring(8, 10)))
        return -1;
      else if (firstDate.day > Number(secondDate.substring(8, 10)))
        return 1;

      return 0;
    }

    if (firstDate.year < secondDate.year)
      return -1;
    else if (firstDate.year > secondDate.year)
      return 1;

    if (firstDate.month < secondDate.month)
      return -1;
    else if (firstDate.month > secondDate.month)
      return 1;

    if (firstDate.day < secondDate.day)
      return -1;
    else if (firstDate.day > secondDate.day)
      return 1;

    return 0;
  }

  validate(): boolean {
    this.validState.validName = this.game.name !== "";
    this.validState.validSeasonName = this.game.seasonName !== "";
    this.validState.validStartDate = this.game.startDate && this.game.startDate.year &&
      this.game.startDate.month && this.game.startDate.day;
    this.validState.validEndDate = this.game.endDate && this.game.endDate.year &&
      this.game.endDate.month && this.game.endDate.day;

    this.validState.validDatesForGame = this.validState.validStartDate && this.validState.validEndDate &&
      this.compareDates(this.game.startDate, this.game.endDate) < 0;

    for (let otherGame of this.games) {
      this.validState.validDatesForAllGames = this.compareDates(this.game.endDate, otherGame.startDate) < 0 ||
        this.compareDates(otherGame.endDate, this.game.startDate) < 0;
    }

    this.validState.validConstructLink = this.game.constructLink !== "";

    for (let index = 0; index < this.game.levels.length; index++) {
      this.validState.validLevels[index].validAlchemerLink = this.game.levels[index].alchemerLink !== "";
      this.validState.validLevels[index].validMillis = this.game.levels[index].millis != 0;
     // this.validState.validLevels[index].validImageLink = this.game.levels[index].imageLink !== "";

      // for (let subindex = 0; subindex < this.game.levels[index].awards.length; subindex++) {
      //   this.validState.validLevels[index].validAwards[subindex].validName = this.game.levels[index].awards[subindex].name !== "";
      //   this.validState.validLevels[index].validAwards[subindex].validImageLink = this.game.levels[index].awards[subindex].imageLink !== "";
      // }
    }

    for (let prop in this.validState) {
      if (!this.validState[prop])
        return false;
    }

    for (let level of this.validState.validLevels) {
      for (let prop in level) {
        if (!level[prop])
          return false;
      }

      // for (let award of level.validAwards) {
      //   for (let prop in award) {
      //     if (!award[prop]) {
      //       return false;
      //     }
      //   }
      // }
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
