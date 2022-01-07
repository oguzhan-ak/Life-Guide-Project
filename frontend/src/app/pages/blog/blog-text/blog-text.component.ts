import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss']
})
export class BlogTextComponent implements OnInit {

  constructor() { }
  @Input() titleName:string;
  @Input() text:string;
  @Input() titleClass:string;
  @Input() id:string;
  ngOnInit(): void {
  }

}
