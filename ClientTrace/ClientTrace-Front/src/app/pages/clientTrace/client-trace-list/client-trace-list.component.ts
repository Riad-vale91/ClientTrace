import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITrace } from 'src/app/models/ITrace';
import { MatTableDataSource } from '@angular/material/table';
import { TabellaDialogComponent } from 'src/app/components/tabella-dialog/tabella-dialog.component';
import { ITipoTraccia } from 'src/app/models/ITipoTraccia';
import { TraceService } from 'src/app/services/trace.service';
@Component({
  selector: 'app-client-trace-list',
  templateUrl: './client-trace-list.component.html',
  styleUrls: ['./client-trace-list.component.css']
})
export class ClientTracelistComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'dataOra', 'societa', 'agenzia', 'nomeApplicazione', 'utente','idTipoTraccia', 'idTracerCategories'];
  list: ITrace[] = [];
  tracciaTypes: ITipoTraccia[] = [];
  dataSource: MatTableDataSource<ITrace> = new MatTableDataSource<ITrace>(this.list);
  isLoading = true;
  numberOfRows: number = 20; 
  selectedIdTipoTraccia: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  private traceSubscription?: Subscription;

  constructor(private traceService: TraceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
      this.paginatorPage();
  }
  ngOnInit() {
    this.getAllTraces(this.numberOfRows, this.selectedIdTipoTraccia); 
    this.traceService.getTraceTypes().subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    });   
  }
  getAllTraces(numberOfRows: number, idTipoTraccia: number) {
    this.isLoading = true;
    this.traceService.getTraces(numberOfRows, idTipoTraccia).subscribe((traces: ITrace[]) => {
      this.list = traces;
      this.dataSource = new MatTableDataSource<ITrace>(this.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let searchString = JSON.stringify(data);
        return searchString.toLowerCase().includes(filter);
      };
      this.isLoading = false;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateList() {
    this.getAllTraces(this.numberOfRows, this.selectedIdTipoTraccia);
  }
  
  onRowClicked(row: ITrace) {
    this.dialog.open(TabellaDialogComponent, {
        width: '500px',
        data: row
    });
  }
  ngOnDestroy() {
    this.traceSubscription?.unsubscribe();
  }
  paginatorPage(){
    if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
  }
}

