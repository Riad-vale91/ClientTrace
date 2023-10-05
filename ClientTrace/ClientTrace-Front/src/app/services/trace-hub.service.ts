import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@aspnet/signalR';
import { environment } from 'src/environments/environment';

//const base_url = 'http://localhost:5288';
const base_url = environment.urlService;
//const base_url = 'https://traceninja.sopranciodue.it:447';

@Injectable({
  providedIn: 'root'
})
export class TraceHubService {
  public hubConnection?: signalR.HubConnection;
  private _isTracerRefresher$ = new BehaviorSubject<Boolean>(false);

  get GetIsTracerRefreshObservalbe(){
    return this._isTracerRefresher$.asObservable();
  }

  set SetIsTracerRefreshObservalbe(isUpdateTracer: Boolean){
    this._isTracerRefresher$.next(isUpdateTracer);
  }

  constructor(private httpClient: HttpClient) { }

  public startConnection(){
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/gettracerhub",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
    .start()
    .then(() =>{
        console.log("Connection started")
        //this.InvokeMonitoring();
    })
    .catch( err =>{
       console.log("Connection finished" + err) 
    });
  }

  public ReceveTracer(){
    this.hubConnection?.on("GetDevTracerDbHub", (data: any) =>{
      this.SetIsTracerRefreshObservalbe = true;
      console.log("ReceveTracer", data)
    });
  }
}
