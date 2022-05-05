import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from './signalr/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'argon-dashboard-angular';
  constructor( 
    public signalrService: SignalrService
  ) 
  {}

  async ngOnInit(){
    await this.signalrService.startConnection();
  }

  ngOnDestroy(){
    this.signalrService.hubConnection.off("askServerResponse");
  }
}


