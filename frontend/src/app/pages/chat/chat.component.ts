import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { SignalrService } from 'src/app/signalr/signalr.service';
import Util from 'src/app/utils/Util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public userEmail : string;

  constructor(public signalrService: SignalrService) { }
  async ngOnInit() {
    await Util.delay(500)
    this.authMe();
    this.authMeListenerSuccess();
    this.authMeListenerFail();
    
  }
  ngOnDestroy(){
    this.signalrService.hubConnection.off("authMeResponseSuccess");
    this.signalrService.hubConnection.off("authMeResponseFail");
  }
  async authMe() {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    let personInfo = {userEmail: user.email};

    await this.signalrService.hubConnection.invoke("authMe", personInfo)
    .then(() => {
      this.signalrService.toastrService.info("Connection is starting ...")
    })
    .catch(err => console.error(err));
  }



  private authMeListenerSuccess() {
    this.signalrService.hubConnection.on("authMeResponseSuccess", (personInfo: any) => {
        this.userEmail = personInfo.Email;
        this.signalrService.toastrService.success("Connection Created Successfully");
    });
  }


  private authMeListenerFail() {
    this.signalrService.hubConnection.on("authMeResponseFail", () => {
      this.signalrService.toastrService.error("Bağlantı kurulamadı!");
    });
  }
}
