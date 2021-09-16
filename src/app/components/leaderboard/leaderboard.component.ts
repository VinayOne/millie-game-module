import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../User";
import { UserService } from "../../services/user.service";
import { UiService } from "../../services/ui.service";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {
  @Input() users: User[] = [];
  user: User[] = [];
  interests: string[] = [];
  interest: string = "Hiking";
  modalOptions: NgbModalOptions = {};

  constructor(private uiService: UiService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.user = users.filter(user => user.username == "scottie11");

      users = users.filter(user => user.interests.some(interest => this.interest.toLowerCase() == interest));

      users.sort((userA, userB) => userB.score - userA.score);

      users.forEach((user, index) => user.rank = index + 1);

      this.users = users.filter(user => (user.rank && user.rank <= 3)).concat(this.user);
    });

    this.uiService.getInterests().subscribe((interests) => this.interests = interests);
  }

  // may need to change modal's data type to be more secure
  openModal(modal: any): void {
    this.modalService.open(modal, this.modalOptions).result.then((result) => {}, (reason) => {});
  }
}
