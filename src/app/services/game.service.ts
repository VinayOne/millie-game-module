import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../Game';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  createGame(game: Game) {
    return this.http.post<any>("/api/game/", game, httpOptions);
  }

  // change method name to getCurrentGame
  getCurrentGame() {
    return this.http.get<any>("/api/game/current", httpOptions);
  }

  getGameById(_id: String) {
    return this.http.get<any>("/api/game/" + _id, httpOptions);
  }

  getGames() {
    return this.http.get<any>("/api/games/", httpOptions);
  }

  updateGame(_id: String, game: Game) {
    return this.http.put<any>("/api/game/" + _id, game, httpOptions);
  }

  deleteGame(game: Game) {
    return this.http.delete<any>("/api/game/" + game._id, httpOptions);
  }
}
