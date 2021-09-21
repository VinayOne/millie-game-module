import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../User";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items?: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
