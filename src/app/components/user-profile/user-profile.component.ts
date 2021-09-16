import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User = { image: "", username: "", score: 0, interests: [] };

  constructor() { }

  ngOnInit(): void {
  }
}
