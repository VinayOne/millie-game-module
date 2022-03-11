import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() name: string = "";
  @Input() color: string = "";
  @Input() progress: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
