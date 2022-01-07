import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-according-to-age',
  templateUrl: './blog-according-to-age.component.html',
  styleUrls: ['./blog-according-to-age.component.scss']
})
export class BlogAccordingToAgeComponent implements OnInit {

  constructor() { }
  @Input() titleName:string;
  @Input() text:string;
  @Input() titleClass:string;
  @Input() id:string;
  ngOnInit(): void {
  }

}
