import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITrace } from 'src/app/models/ITrace';


@Component({
  selector: 'app-tabella-dialog',
  templateUrl: './tabella-dialog.component.html',
  styleUrls: ['./tabella-dialog.component.css']
})
export class TabellaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TabellaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITrace
  ) { }
}
