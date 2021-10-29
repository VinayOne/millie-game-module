import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../User';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  user: User = { image: "", username: "", millies: 0, interests: [] };

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

}
