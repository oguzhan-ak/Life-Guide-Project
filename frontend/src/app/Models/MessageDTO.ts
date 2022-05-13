export class MessageDTO {
    public id:number = 0; 
    public senderUserEmail: string = '';
    public message: string = '';
    public timeStamp: Date = new Date();
    public connectionId: string = '';
    public receiverUserEmail: string = '';
    public messageYear: number;
    public messageMonth: number;
    public messageDay: number;
    public messageHour: number;
    public messageMinute: number;

    constructor(id :number, senderUserEmail:string,message :string,timeStamp : Date, connectionId : string, 
      receiverUserEmail : string, messageYear: number, messageMonth: number, messageDay: number, messageHour: number, messageMinute: number){
      this.senderUserEmail = senderUserEmail
      this.receiverUserEmail = receiverUserEmail
      this.id = id;
      this.message = message;
      this.connectionId = connectionId;
      this.timeStamp = timeStamp;
      this.messageYear = messageYear;
      this.messageMonth = messageMonth;
      this.messageDay = messageDay;
      this.messageHour = messageHour;
      this.messageMinute = messageMinute;
  }
  }