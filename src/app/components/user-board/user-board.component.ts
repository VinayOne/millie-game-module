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
  userEmail = '';
  userMillis = '';
  earnedMillis = 0;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserDetail().subscribe((userDetail: any) => {
      this.user = userDetail.data.result || {};
      this.userEmail = userDetail.data.result.email || '';
      this.userMillis = userDetail.data.result.millies || '0';
      localStorage.setItem('userMillis', this.userMillis);
      setTimeout(() => {
        this.registerCurrentUsr();
      }, 500);
    });
  }

  registerCurrentUsr() {
    this.userService.getCurrentUser().subscribe((response: any) => {
      const currentUserEmail = response ? response.email : null;
      if(currentUserEmail !== null && currentUserEmail === this.userEmail) {
        return console.info(this.userEmail + ' already registered');
      } else {      
      const userInfo = {
      "name" : this.user.firstName,
      "startLevel" : "0",
      "endLevel" : "0",
      "levelSuccess" : false,
      "email" : this.user.email,
      "millis": this.user.millies
        };

      this.userService.registerCurrentUser(userInfo)
        .subscribe((res) => {
            console.info('Current User Registered!');
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  getMillisEarned() {
    const updatedMills = localStorage.getItem('userMillis') || '0';
    this.earnedMillis = parseInt(updatedMills) - parseInt(this.userMillis);
    setTimeout(() => {
      this.userMillis = updatedMills;
    }, 500);
    console.log('getMillisEarned called!');
    console.log('updatedMills: ', updatedMills);
    console.log('userMillis: ', this.userMillis);
  }

  openAdminDashboard() {
    this.router.navigate(['/dashboard-home']);
  }
}
