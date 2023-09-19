import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageModule } from "./components/header-page/header-page.module";

//Azure
import {  IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import {  MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory() : IPublicClientApplication
{
  return new PublicClientApplication({
    auth: {
      clientId: 'efc88d4a-097b-4f1d-8eef-e427e7714804',
          authority:'https://login.microsoftonline.com/d6883a32-fec7-487f-b53c-bd05e5274696',
          redirectUri:'/',
    }
  });
}

//fine Azure

@NgModule({
    declarations: [
        AppComponent
    ],
   
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HeaderPageModule,
        MsalModule
        //Azure
        //fine azure
    ],
    providers: [
      //Azure
      {
        provide: MSAL_INSTANCE,
        useFactory: MSALInstanceFactory,
        //useClass: MsalInterceptor
      },
      MsalService
     //Fine Azure
],
})
export class AppModule { }
