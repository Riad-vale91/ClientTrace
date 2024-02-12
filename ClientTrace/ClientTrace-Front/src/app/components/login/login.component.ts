import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpClient } from '@aspnet/signalr';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  httpOptions: any;
  constructor(private router: Router,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient
    )
  {

  }
  goToLogin(){
    // this.router.navigateByUrl("homepage");
    this.msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        console.log("Login",response);
        this.msalService.instance.setActiveAccount(response.account);
        //console.log("token",response.accessToken);
        //this.getCurrentUserGroups(response.accessToken);
        //response.account?.localAccountId;
        //response.account?.homeAccountId;
        //response.accessToken;
        this.getUserInfoAzure(response);
        //this.router.navigateByUrl("/homepage");
      });
  }

  logout(){
    //azure
    this.msalService.logoutPopup({
      mainWindowRedirectUri: "/"
      //this.router.navigateByUrl("/home");
    });
    //fine azure
  }

  getUserInfoAzure(resp: any){
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': resp.accessToken
      })
    };
    this.http.get('https://graph.microsoft.com/v1.0/users/' + resp.account.localAccountId + "?$select=department,jobtitle,companyname", this.httpOptions).subscribe(resp =>{
      console.log(resp);
    });
  }
}
