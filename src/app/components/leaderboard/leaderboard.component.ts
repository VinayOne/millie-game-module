import { Component, OnInit, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
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
  user: any = {};
  interests: any[] = [];
  interest: string = "";
  interestId: string = "";
  leaderBoardUsers: any[] = [];
  showLeaderboard: boolean = false;
  modalOptions: NgbModalOptions = {};

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe((userDetail) => {
      this.user = userDetail.data.result;

      this.user.interests.forEach((interest: any) => this.interests.push({'id': interest.id, 'title': interest.title}));

      this.interest = this.interests[0].title;
      this.interestId = this.interests[0].id;
    });

    // this.userService.getUsers().subscribe((users) => { //Load leaderboard profiles
    //   console.log('LoadUsersRes > ', users);
    //   users = users.filter(user => user.interests.some(interest => this.interest.toLowerCase() == interest));

    //   users.sort((userA, userB) => userB.millis - userA.millis);

    //   users.forEach((user, index) => user.rank = index + 1);

    //   this.users = users.filter(user => (user.rank && user.rank <= 3));
    //   //console.log('loadUsers > ', this.users);
    // });
  }

  // may need to change modal's data type to be more secure
  openModal(modal: any): void {
    this.modalService.open(modal, this.modalOptions).result.then((result) => {}, (reason) => {});
  }

  changeInterest(modal: any, interest: any) {
    this.interest = interest.title.slice(0,1).toUpperCase() + interest.title.slice(1);
    this.interestId = interest.id;
    modal.close();
    // more robust way to reload component
    // this.ngOnInit();
    this.getLeaderboardUsers();
  }

  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
    this.getLeaderboardUsers();
  }

  //Get LeaderBoard Users
  getLeaderboardUsers() {
    this.userService.getUsersByInterest(this.interestId).subscribe((userData) => {
      const topUsers = userData.data.result;
      topUsers.rows.forEach((user: any) => this.leaderBoardUsers.push({'username': user.firstName, 'millis': user.totalMillis, 'image': user.profilePicture}));
      console.log('Leaderboard > ', this.leaderBoardUsers);
    });
  }
}
