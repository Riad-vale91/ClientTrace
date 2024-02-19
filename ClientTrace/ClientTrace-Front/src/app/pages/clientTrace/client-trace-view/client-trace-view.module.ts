import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientTraceViewRoutingModule } from './client-trace-view-routing.module';

import { HeaderPageModule } from 'src/app/components/header-page/header-page.module';

import { MatSidenavModule } from '@angular/material/sidenav';

import { ClientTraceViewComponent } from './client-trace-view.component';
import { ClientTraceListModule } from '../client-trace-list/client-trace-list.module';

@NgModule({
  declarations: [ClientTraceViewComponent ], 
  imports: [
    CommonModule,
    ClientTraceViewRoutingModule,
    HeaderPageModule,
    ClientTraceListModule,
    MatSidenavModule
  ]
})
export class ClientTraceViewModule { }
