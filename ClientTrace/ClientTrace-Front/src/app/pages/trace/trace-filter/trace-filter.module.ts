import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceFilterRoutingModule } from './trace-filter-routing.module';
import { TraceFilterComponent } from './trace-filter.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar'

import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TraceFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TraceFilterRoutingModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    //Fine Material
    // datapicker
    MatDatepickerModule
  ],
  exports:[
    TraceFilterComponent
  ]
})
export class TraceFilterModule { }
