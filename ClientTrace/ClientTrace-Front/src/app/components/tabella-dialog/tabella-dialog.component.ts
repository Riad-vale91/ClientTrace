import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITrace } from 'src/app/models/ITrace';


@Component({
  selector: 'app-tabella-dialog',
  templateUrl: './tabella-dialog.component.html',
  styleUrls: ['./tabella-dialog.component.css']
})
export class TabellaDialogComponent implements OnInit{

  public descrizioneJson: any;
  displayedColumns: string[] = [];
  displayedData: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<TabellaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITrace
  ) { 

    //console.log("TabellaDialogComponent", data);
    if(data?.descrizione){
      this.descrizioneJson = JSON.parse(data?.descrizione);
      console.log("json", this.descrizioneJson);
    }

    this.getCreateColumn();
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.getCreateColumn();
  }

  getCreateColumn(){
    if(this.descrizioneJson == null) return;
    this.displayedColumns =  Object.keys(this.descrizioneJson);
    this.displayedData =  Object.values(this.descrizioneJson);
  }

}
