import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor(public toastrService : ToastrService,public router : Router) { }
  hubConnection : signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5002/toastr', 
    {
      skipNegotiation : true,
      transport : signalR.HttpTransportType.WebSockets
    })
    .build();
    this.hubConnection.start().then(() => {
      // console.log('hubConnectionStart'); // 1.adım
      // this.askServerListener();
      // this.askServer();
    })
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  // async askServer(){
  //   console.log('askServerStart'); // 3.adım
  //   await this.hubConnection.invoke("askServer","hi") // askServer serverdaki bir method. "hey" de ona gönderilen parametre
  //     .then(() => {
  //       console.log('askServer.then'); // 5.adım
  //     })
  //     .catch(err => console.log(err))
  //   console.log('This is the final prompt') // 6.adım
  // }

  // askServerListener(){
  //   console.log('askServerListenerStart'); // 2.adım
  //   this.hubConnection.on("askServerResponse",(someText) => {
  //     console.log('askServer.listener'); // 4.adım
  //     this.toastrService.success(someText)
  //   })
  // }





}
