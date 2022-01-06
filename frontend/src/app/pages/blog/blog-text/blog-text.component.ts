import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTextComponent implements OnInit {

  constructor() { }
  @Input() title:string;
  @Input() text:string;
  @Input() titleColor:string;
  @Input() id:string;
  ngOnInit(): void {
  }

}
