import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //@Input() user: User = { image: "", username: "", millis: 0, interests: [] };
  @Input() userData: any;

  constructor() { }

  ngOnInit(): void {
  }
}
