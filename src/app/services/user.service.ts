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

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.http.get<any>('/api/user-detail', httpOptions);
    //return this.http.get<any>(`${this.baseUrl}/user/game/user-detail`, httpOptions);
  }

  loginUser(user: any) {
    return this.http.post<any>('/api/login', user, httpOptions);
  }

  getUsersByInterest(interestId:any, pageCount:number = 10, page:number = 1): Observable<any> {
    return this.http.get<any>(`/api/leaderboard-users/${pageCount}/${interestId}/${page}`, httpOptions)
  }

  registerCurrentUser(userData: any): Observable<any> {
    return this.http.post<any>('/api/creategameuser', userData, httpOptions)
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('/api/currentUserId', httpOptions)
  }
}
