import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientTraceListRoutingModule } from './client-trace-list-routing.module';
import { ClientTracelistComponent } from './client-trace-list.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ClientTracelistComponent
  ],
  imports: [
    CommonModule,
    ClientTraceListRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
    

  ],
  exports:
  [
    ClientTracelistComponent
  ]
})
export class ClientTraceListModule { }

