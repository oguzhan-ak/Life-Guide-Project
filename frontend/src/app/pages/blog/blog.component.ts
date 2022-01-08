import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private scroller: ViewportScroller) { }
  titleName:string
  text:string
  titleClass:string
  id:string
  ngOnInit(): void {
  }
  goToLink(tagID:string) {
    var element= document.getElementById(tagID);
    var headerOffset = 80;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    console.log(element);
  }

}
