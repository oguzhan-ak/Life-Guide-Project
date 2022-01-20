import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {

  constructor() { }
  @Input() title:string;
  @Input() ratio:string;
  @Input() dateType:string;
  @Input() value:string;
  @Input() icon:string;
  @Input() color:string;
  ngOnInit(): void {
  }

}
