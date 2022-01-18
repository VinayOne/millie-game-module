import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../User';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getUserDetail().subscribe((userDetail: any) => {
      this.user = userDetail.data.result;
    });
  }

}
