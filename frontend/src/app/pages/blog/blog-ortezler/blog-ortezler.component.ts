import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-ortezler',
  templateUrl: './blog-ortezler.component.html',
  styleUrls: ['./blog-ortezler.component.scss']
})
export class BlogOrtezlerComponent implements OnInit {

  constructor() { }
  titleName:string
  text:string
  titleClass:string
  id:string
  ngOnInit(): void {
  }

}
