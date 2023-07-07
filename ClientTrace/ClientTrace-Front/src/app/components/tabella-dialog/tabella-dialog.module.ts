import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabellaDialogRoutingModule } from './tabella-dialog-routing.module';
import { TabellaDialogComponent } from './tabella-dialog.component';


@NgModule({
  declarations: [TabellaDialogComponent],
  imports: [
    CommonModule,
    TabellaDialogRoutingModule
  ],
  exports:[TabellaDialogComponent],
})
export class TabellaDialogModule { }
