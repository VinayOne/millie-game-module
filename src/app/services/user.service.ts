import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "accessToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MWRkZGEyZWNhYTcxYjBlYTk4Zjc0MTAiLCJleHBpcmVzSW4iOiIzMGQiLCJwcm9maWxlVHlwZSI6ImdhbWUiLCJpYXQiOjE2NDYxMzExOTcsImV4cCI6MTY0ODcyMzE5N30.GwmZNf8oeY5Om2c_KSB6q4p7UKD8nbUdzhJSTG46mwA"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://18.118.169.0:5000";

  private apiUrl: string = "/api/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, httpOptions);
    //return this.http.get<User[]>(`${this.baseUrl}/user/game/user-detail`, httpOptions);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${username}`, httpOptions);
    //return this.http.get<User>(`${this.baseUrl}/user/game/user-detail/${username}`, httpOptions);
  }

  getUserDetail(): Observable<any> {
    return this.http.get<any>("/api/user-detail", httpOptions);
    //return this.http.get<any>(`${this.baseUrl}/user/game/user-detail`, httpOptions);
  }

  loginUser(user: any) {
    return this.http.post<any>("/api/login", user, httpOptions);
  }

  getUsersByInterest(interestId:any, pageCount:number = 10, page:number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/leaderboard/game-rank?type=currentSeason&pageCount=${pageCount}&interestId=${interestId}&page=${page}`, httpOptions2)
  }
}
