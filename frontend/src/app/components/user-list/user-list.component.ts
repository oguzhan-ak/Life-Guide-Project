import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList:User[] =[];
  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser()
  {
    this.shared.getAllUser().subscribe((data : User[]) => {
      this.userList=data;
    })
  }

}
