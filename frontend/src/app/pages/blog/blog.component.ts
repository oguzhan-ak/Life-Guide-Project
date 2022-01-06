import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }
  title:string
  text:string
  titleColor:string
  id:string
  ngOnInit(): void {
  }

}
