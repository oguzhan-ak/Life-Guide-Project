import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  constructor(private route:Router) { }
  serebral_palsi_ids:string[]=["nedir","neden","primer-problemler","klinik-tipleri","spastik","hemiparetik","diparetik","kuadriparetik","diskinetik","korea-ateotid","distonik","ataksik","hipotonik"]
  yaslara_gore_ids:string[]=["sadf","fasd","kasd","lasd"]
  ortezler_ids:string[]=[]
  aile_egitimi_ids:string[]=[]
  ngOnInit(): void {
  }
  
  goToLink(tagID:string) {
    var tag_element= document.getElementById(tagID);
    if(tag_element == null){
      if(this.serebral_palsi_ids.includes(tagID)){
        console.log("bu tag serebral palside")
        console.log(tagID)
        this.route.navigate(['serebral-palsi']);
        return;
      }else if(this.yaslara_gore_ids.includes(tagID)){
        console.log("bu tag yaslara görede")
        console.log(tagID)
        this.route.navigate(['yaslara-gore-sp']);
        var element= document.getElementById(tagID);
        var headerOffset = 80;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }else if(this.ortezler_ids.includes(tagID)){
        console.log("bu tag ortezlerde")
        console.log(tagID)
        this.route.navigate(['ortezler']);
        var element= document.getElementById(tagID);
        var headerOffset = 80;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }else if(this.aile_egitimi_ids.includes(tagID)){
        console.log("bu tag aile egitiminde")
        console.log(tagID)
        this.route.navigate(['aile-egitimi']);
        var element= document.getElementById(tagID);
        var headerOffset = 80;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }else{
      var headerOffset = 80;
      var elementPosition = tag_element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    
  }

}
