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
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${username}`, httpOptions);
  }

  getUserDetail(): Observable<any> {
    return this.http.get<any>("/api/user-detail", httpOptions);
  }

  loginUser(user: any) {
    return this.http.post<any>("/api/login", user, httpOptions);
  }
}
