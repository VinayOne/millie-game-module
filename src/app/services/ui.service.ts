import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private apiUrl: string = "http://localhost:5000/interests";

  constructor(private http: HttpClient) { }

  getInterests() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
