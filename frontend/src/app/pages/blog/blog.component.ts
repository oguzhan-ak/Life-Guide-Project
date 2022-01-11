import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  constructor(private route:Router) { }
  titleName:string
  text:string
  titleClass:string
  id:string
  ngOnInit(): void {
  }
  
  goToLink(tagID:string) {
    var tag_element= document.getElementById(tagID);
    var header_element= document.getElementById('blog_header');
    var headerOffset = header_element.offsetHeight+20;
    var elementPosition = tag_element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

}
