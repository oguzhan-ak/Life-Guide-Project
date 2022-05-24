import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { getMessageDTO } from 'src/app/Models/getMessageDTO';
import { MessageDTO } from 'src/app/Models/MessageDTO';
import { User } from 'src/app/Models/user';
import { SharedService } from 'src/app/shared/shared.service';
import { ChatService } from 'src/app/signalr/chat.service';
import Util from 'src/app/utils/Util';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private shared:SharedService,private chat:ChatService,private toastrService : ToastrService) { }

  messageDto: MessageDTO = new MessageDTO(0,"","",new Date(),"","",0,0,0,0,0);
  msgInboxArray: MessageDTO[] = [];
  message : string = '';
  senderUserEmail: string = '';
  userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  selectedReceiverUser = new User("","","",true,"",0,"","");
  public userList:User[] =[];

  
  async ngOnInit() {
    await this.getAllUser();
    Util.delay(500);
    this.chat.retrieveMappedObject().subscribe( (receivedObj: MessageDTO) => 
    { 
      this.addToInbox(receivedObj);
    });  // calls the service method to get the new messages sent
  }
  send(): void {
    this.messageDto.message = this.message;
    this.messageDto.receiverUserEmail = this.selectedReceiverUser.email;
    this.messageDto.senderUserEmail = this.userInfo.email;
    this.messageDto.timeStamp = new Date();
    if(this.message.length == 0 || this.messageDto.senderUserEmail.length == 0 || this.messageDto.receiverUserEmail.length == 0) {
      this.toastrService.success("Boş metin gönderemezsiniz !")
      return;
    }else {
      this.chat.broadcastMessage(this.messageDto);                   // Send the message via a service
    }
    this.message = ''
  }

  addToInbox(obj: MessageDTO) {
    let newObj = new MessageDTO(0,"","",new Date(),"","",0,0,0,0,0);
    newObj.senderUserEmail = obj.senderUserEmail;
    newObj.message = obj.message;
    newObj.receiverUserEmail = obj.receiverUserEmail;
    newObj.timeStamp = obj.timeStamp;
    newObj.connectionId = obj.connectionId;
    newObj.messageYear = obj.messageYear;
    newObj.messageMonth = obj.messageMonth;
    newObj.messageDay = obj.messageDay;
    newObj.messageHour = obj.messageHour;
    newObj.messageMinute = obj.messageMinute;
    this.msgInboxArray.push(newObj);
    
  }

  getAllUser()
  {
    this.shared.getAllUser().subscribe((data : User[]) => {
      this.userList=data;
    })
  }
  getMessages(){
    var getMessageDto = new getMessageDTO(this.userInfo.email,this.selectedReceiverUser.email );
    this.chat.getMessagesBetweenUsers(getMessageDto).subscribe((data : MessageDTO[]) => {
      this.msgInboxArray = data;
    })
  }

  changeReceiverUser(user : User){
    this.selectedReceiverUser = user
    this.getMessages();

  }
}
