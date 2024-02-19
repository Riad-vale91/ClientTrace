import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, map, startWith, switchMap } from 'rxjs';
import { TabellaDialogComponent } from 'src/app/components/tabella-dialog/tabella-dialog.component';
import { ITrace } from 'src/app/models/ITrace';
import { TraceService } from 'src/app/services/trace.service';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  styleUrls: ['./trace-list.component.css']
})

export class TraceListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'dataOra', 'societa', 'agenzia', 'nomeApplicazione', 'utente','idTipoTraccia', 'idTracerCategories'];

  list: ITrace[] = [];
  traces:ITrace[] = [];
  tracesFilter: ITrace[] = [];
  sopFilter: string = "";
  citFilter:  string = "";
  giaFilter: string = "";
  co2Filter: string = "";
  isFilter: boolean = false;

  selectedSocieta: string[] = [];
  dataSource: MatTableDataSource<ITrace> = new MatTableDataSource<ITrace>(this.list);
  isLoading = true;
  numberOfRows: number = 1000; 
  selectedIdTipoTraccia: number = 3;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  formGroup: FormGroup;
  startDateFilter: Date | undefined;
  endDateFilter: Date | undefined;
  descrizioneFilter: string = "";

  private traceSubscription?: Subscription;

  private traceHubSubcription?: Subscription;

  constructor(private traceService: TraceService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    //private traceHubService: TraceHubService
    ) 
  { 
    this.isLoading = true;
    this.formGroup = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      descrizione: ['']
    });
  }

  ngOnDestroy(): void {
    this.traceSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllTraces();
  }

  onNumberOfRowsChange(value: number) {
    this.numberOfRows = value;
  }

  getAllTraces() {  
    this.isLoading = true;
    this.traceSubscription = this.traceService.getTracesObservable.subscribe((traces: ITrace[]) => {
      this.list = traces;
      this.dataSource.data = this.list;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator?.firstPage();
      this.isLoading = false;
    }),
    (error: any) => {()=>{
      console.log(error);
      alert("Errore nel caricamento delle tracce " + error);
    }};
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return Object.entries(data).some(([key, val]) => {
        return val ? val.toString().toLowerCase().includes(filter) : false;
      });
    };
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPopupDescrizione(trace: ITrace) {
    this.dialog.open(TabellaDialogComponent, {
      width: '800px',
      data: trace
    });
  }

}
