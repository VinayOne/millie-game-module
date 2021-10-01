import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('dashboard') dashboard?: ElementRef;
  @Output() height: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentChecked() {
    setTimeout(() => this.height.emit(this.dashboard?.nativeElement.offsetHeight));
  }
}
