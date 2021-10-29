import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../User";
import { UserService } from "../../services/user.service";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {
  @Input() users: User[] = [];
  user: User = { image: "", username: "", millies: 0, interests: [] };
  interests: string[] = [];
  interest: string = "Hiking";
  showLeaderboard: boolean = true;
  modalOptions: NgbModalOptions = {};

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.user = users.filter(user => user.username == "scottie11")[0];

      this.interests = this.user.interests;

      users = users.filter(user => user.interests.some(interest => this.interest.toLowerCase() == interest));

      users.sort((userA, userB) => userB.millies - userA.millies);

      users.forEach((user, index) => user.rank = index + 1);

      this.users = users.filter(user => (user.rank && user.rank <= 3));
    });
  }

  // may need to change modal's data type to be more secure
  openModal(modal: any): void {
    this.modalService.open(modal, this.modalOptions).result.then((result) => {}, (reason) => {});
  }

  changeInterest(modal: any, interest: string) {
    this.interest = interest.slice(0,1).toUpperCase() + interest.slice(1);
    modal.close();
    // more robust way to reload component
    this.ngOnInit();
  }

  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
  }
}
