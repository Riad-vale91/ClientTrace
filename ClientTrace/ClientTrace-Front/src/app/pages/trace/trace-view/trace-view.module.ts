import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceViewRoutingModule } from './trace-view-routing.module';
import { TraceViewComponent } from './trace-view.component';
import { TraceListModule } from '../trace-list/trace-list.module';
import { TraceFilterModule } from '../trace-filter/trace-filter.module';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderPageModule } from 'src/app/components/header-page/header-page.module';


@NgModule({
  declarations: [
    TraceViewComponent
  ],
  imports: [
    CommonModule,
    TraceViewRoutingModule,
    TraceListModule,
    TraceFilterModule,
    HeaderPageModule,

    // Add the MatSidenavModule to the imports array
    MatSidenavModule
    //end angular material
  ]
  
})
export class TraceViewModule { }
