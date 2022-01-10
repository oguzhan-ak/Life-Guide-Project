import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-serebral-palsi',
  templateUrl: './blog-serebral-palsi.component.html',
  styleUrls: ['./blog-serebral-palsi.component.scss']
})
export class BlogSerebralPalsiComponent implements OnInit {

  constructor() { }
  titleName:string
  text:string
  titleClass:string
  id:string
  ngOnInit(): void {
  }

}
