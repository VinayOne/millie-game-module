import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../User';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  user: any = {};
  userRegistered = 'false';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserDetail().subscribe((userDetail: any) => {
      this.user = userDetail.data.result;
      this.registerCurrentUsr();
    });
  }

  registerCurrentUsr() {
    const isUsrRegistered = localStorage.getItem('userRegistered');
    if (isUsrRegistered === 'true') {
      return console.info('User already registered');
    } else {
    this.userRegistered = 'true';
    localStorage.setItem('userRegistered', this.userRegistered);
    const userInfo = {
      "name" : this.user.firstName,
      "startLevel" : "0",
      "endLevel" : "0",
      "levelSuccess" : false,
      "email" : this.user.email
    };
    this.userService.registerCurrentUser(userInfo)
    .subscribe((res) => {
        console.info('Current User Registered!');
    }, (error) => {
      console.log(error);
    });
    }
  }

  openAdminDashboard() {
    this.router.navigate(['/dashboard-home']);
  }
}
