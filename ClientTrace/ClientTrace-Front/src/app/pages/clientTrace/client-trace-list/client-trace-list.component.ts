import { Component, OnInit, ViewChild } from '@angular/core';
import { TraceService } from 'src/app/services/trace.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITrace } from 'src/app/models/ITrace';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-trace-list',
  templateUrl: './client-trace-list.component.html',
  styleUrls: ['./client-trace-list.component.css']
})
export class ClientTracelistComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'DataOra', 'Societa', 'Agenzia', 'NomeApplicazione', 'Utente', 'Pagina', 'Descrizione', 'IdTipoTraccia', 'IdTracerCategories', 'actions'];
  list: ITrace[] = [];
  dataSource: MatTableDataSource<ITrace> = new MatTableDataSource<ITrace>(this.list);
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  private traceSubscription?: Subscription;

  constructor(private traceService: TraceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllTraces();
  }

  getAllTraces() {
    this.isLoading = true;
    this.traceSubscription = this.traceService.getTraces().subscribe((traces: ITrace[]) => {
      this.list = traces;
      this.dataSource = new MatTableDataSource<ITrace>(this.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    this.getAllTraces();
  }
  onRowClicked(list: ITrace) {}
  ngOnDestroy() {
    this.traceSubscription?.unsubscribe();
  }
}

