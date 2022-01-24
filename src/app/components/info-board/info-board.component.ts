import { Component, OnInit } from '@angular/core';
import { User } from "../../User";
import { UserService } from "../../services/user.service"; 

@Component({
  selector: 'app-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.css']
})
export class InfoBoardComponent implements OnInit {
  user: User = { image: "", username: "", millies: 0, interests: [] };
  showInfoboard: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser("scottie11").subscribe(user => {
      this.user = user;
    });
  }

  toggleInfoboard() {
    this.showInfoboard = !this.showInfoboard;
  }
}
