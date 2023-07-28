import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientTraceFilterRoutingModule } from './client-trace-filter-routing.module';
import { ClientTraceFilterComponent } from './client-trace-filter.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
        
  ],
  exports:[
    ClientTraceFilterComponent
  ]
})
export class ClientTraceFilterModule { }
