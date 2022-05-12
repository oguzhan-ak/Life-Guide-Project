export class getMessageDTO {
    public senderUserEmail: string;
    public receiverUserEmail: string ;

    constructor(senderUserEmail:string,receiverUserEmail : string){
        this.senderUserEmail = senderUserEmail
        this.receiverUserEmail = receiverUserEmail
    }
  }