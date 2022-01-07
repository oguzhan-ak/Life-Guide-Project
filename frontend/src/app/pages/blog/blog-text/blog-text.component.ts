import {  Component, Input, OnInit, ViewEncapsulation,Attribute } from '@angular/core';

@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTextComponent implements OnInit {

  constructor(@Attribute('name') public name: string) { }
  @Input() titleName:string;
  @Input() text:string;
  @Input() titleClass:string;
  @Input() id:string;
  ngOnInit(): void {
  }

}
