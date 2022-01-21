import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  constructor() { }
  @Input() videoTitle:string;
  @Input() likeCount:string;
  @Input() dislikeCount:string;
  //@Input() videoLink:string;
  ngOnInit(): void {
  }

}
