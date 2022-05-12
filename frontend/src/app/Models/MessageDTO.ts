export class MessageDTO {
    public id:number = 0; 
    public senderUserEmail: string = '';
    public message: string = '';
    public timeStamp: Date = new Date();
    public connectionId: string = '';
    public receiverUserEmail: string = '';

    constructor(id :number, senderUserEmail:string,message :string,timeStamp : Date, connectionId : string, receiverUserEmail : string){
      this.senderUserEmail = senderUserEmail
      this.receiverUserEmail = receiverUserEmail
      this.id = id;
      this.message = message;
      this.connectionId = connectionId;
      this.timeStamp = timeStamp;
  }
  }