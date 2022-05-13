import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { MessageDTO } from '../Models/MessageDTO';
import * as signalR from '@microsoft/signalr';          // import signalR
import { getMessageDTO } from '../Models/getMessageDTO';
import { ResponseModel } from '../Models/responseModel';
import { ResponseCode } from '../Enums/responseCode';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private  connection: any = new signalR.HubConnectionBuilder().withUrl("http://localhost:5002/chatsocket",{
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })   // mapping to the chathub as in startup.cs
  .build();
  readonly POST_URL = "http://localhost:5003/api/chat/"

  private receivedMessageObject: MessageDTO = new MessageDTO(0,"","",new Date(),"","",0,0,0,0,0);
  private sharedObj = new Subject<MessageDTO>();


  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (senderUserEmail, message, receiverUserEmail, timeStamp, connectionId, messageYear, messageMonth, messageDay, messageHour, messageMinute) => 
    { 
     this.mapReceivedMessage(senderUserEmail, message,receiverUserEmail,timeStamp,connectionId, messageYear, messageMonth, messageDay, messageHour , messageMinute); 
    });
   this.start(); 
  }

  // Start the connection
  public async start() {
    try {
      await this.connection.start();
    } catch (err) {
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(senderUserEmail: string, message: string, receiverUserEmail:string, timeStamp: Date, connectionId: string 
    , messageYear:number , messageMonth : number, messageDay:number, messageHour:number, messageMinute:number): void {
    this.receivedMessageObject.senderUserEmail = senderUserEmail;
    this.receivedMessageObject.message = message;
    this.receivedMessageObject.receiverUserEmail = receiverUserEmail;
    this.receivedMessageObject.timeStamp = timeStamp;
    this.receivedMessageObject.connectionId = connectionId;
    this.receivedMessageObject.messageYear = messageYear;
    this.receivedMessageObject.messageMonth = messageMonth;
    this.receivedMessageObject.messageDay = messageDay;
    this.receivedMessageObject.messageHour = messageHour;
    this.receivedMessageObject.messageMinute = messageMinute;
    this.sharedObj.next(this.receivedMessageObject);
 }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL +'send', msgDto).subscribe();
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }
  public getMessagesBetweenUsers(getMessageDto : getMessageDTO) {
    return this.http.post<ResponseModel>(this.POST_URL +'getPrivateMessages', getMessageDto).pipe(map(res => {
      if(res.responseCode==ResponseCode.OK){
        let messageList= new Array<MessageDTO>();
        if(res.dateSet){
          res.dateSet.map((x:MessageDTO) =>{
            messageList.push(new MessageDTO(x.id,x.senderUserEmail,x.message,x.timeStamp,x.connectionId, x.receiverUserEmail, x.messageYear, x.messageMonth, x.messageDay, x.messageHour, x.messageMinute));
          });
        }
        return messageList;
      }
    }));
  }
  public retrieveMappedObject(): Observable<MessageDTO> {
    return this.sharedObj.asObservable();
  }
}
