import { Component, OnInit } from '@angular/core';
import { Game } from "../../Game";
import { GameService } from "../../services/game.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-creator-dashboard-home',
  templateUrl: './creator-dashboard-home.component.html',
  styleUrls: ['./creator-dashboard-home.component.css']
})
export class CreatorDashboardHomeComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  onCreateNewGame() {
    this.router.navigate(['/dashboard']);
  }

  onEditGame(game: Game) {
    this.router.navigate(['/dashboard/' + game._id]);
  }

  onDeleteGame(game: Game) {
    this.gameService.deleteGame(game).subscribe((game) => {
      this.ngOnInit();
    });
  }
}
