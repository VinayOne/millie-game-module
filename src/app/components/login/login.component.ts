import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.loginUser(this.loginUserData)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/games']);
      }, err => console.log(err));
  }
}
