import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infographic',
  templateUrl: './infographic.component.html',
  styleUrls: ['./infographic.component.css']
})
export class InfographicComponent implements OnInit {
  @Input() image?: string = "";
  @Input() text?: string = "";
  @Input() showImage?: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
