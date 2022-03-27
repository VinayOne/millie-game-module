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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserDetail().subscribe((userDetail: any) => {
      this.user = userDetail.data.result;
      this.userEmail = userDetail.data.result.email;
      setTimeout(() => {
        this.registerCurrentUsr();
      }, 500);
    });
  }

  registerCurrentUsr() {
    this.userService.getCurrentUser().subscribe((response: any) => {
      const currentUserEmail = response ? response.email : null;
      console.log('currentUserEmail: ', currentUserEmail);
      if(currentUserEmail !== null && currentUserEmail === this.userEmail) {
        return console.info(this.userEmail + ' already registered');
      } else {      
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
    });
  }

  openAdminDashboard() {
    this.router.navigate(['/dashboard-home']);
  }
}
