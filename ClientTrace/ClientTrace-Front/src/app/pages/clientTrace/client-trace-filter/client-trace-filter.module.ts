import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientTraceFilterRoutingModule } from './client-trace-filter-routing.module';
import { ClientTraceFilterComponent } from './client-trace-filter.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ClientTraceFilterComponent],
  imports: [
    CommonModule,
    ClientTraceFilterRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    ClientTraceFilterComponent
  ]
})
export class ClientTraceFilterModule { }
