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
import { TabellaDialogModule } from 'src/app/components/tabella-dialog/tabella-dialog.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ClientTraceFilterModule } from "../client-trace-filter/client-trace-filter.module";
import { ClientTraceFilterComponent } from '../client-trace-filter/client-trace-filter.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 




@NgModule({
    declarations: [
        ClientTracelistComponent
    ],
    exports: [
        ClientTracelistComponent
    ],
    imports: [
        CommonModule,
        ClientTraceListRoutingModule,
        TabellaDialogModule,
        ClientTraceFilterModule,
        FormsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCheckboxModule
        
    ]
})
export class ClientTraceListModule { }

