import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  @Input() index: number = 0;
  @Input() level: any = {};
  @Input() validState: any = {};

  numOfAwards: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.numOfAwards = this.level.awards.length;
    this.validState.validAwards = Array(this.numOfAwards).fill({ validName: true, validImageLink: true });
  }

  updateAwardsArray() {
    if (this.numOfAwards > this.level.awards.length) {
      this.level.awards.push({
        name: "",
        imageLink: ""
      });

      this.validState.validAwards.push({
        validName: true,
        validImageLink: true
      });
    }
    else {
      this.level.awards.pop();
      this.validState.validAwards.pop();
    }
  }
}
