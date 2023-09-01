import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TraceHubService } from 'src/app/services/trace-hub.service';

@Component({
  selector: 'app-client-trace-list',
  templateUrl: './client-trace-list.component.html',
  styleUrls: ['./client-trace-list.component.css'],
  
  
})
export class ClientTracelistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'dataOra', 'societa', 'agenzia', 'nomeApplicazione', 'utente','idTipoTraccia', 'idTracerCategories'];
  list: ITrace[] = [];
  traces:ITrace[] = [];
  tracesFilter: ITrace[] = [];
  sopFilter: string = "";
  citFilter:  string = "";
  giaFilter: string = "";
  co2Filter: string = "";
  isFilter: boolean = false;
  tracciaTypes: ITipoTraccia[] = [];
  societa: string[] = [];
  selectedSocieta: string[] = [];
  dataSource: MatTableDataSource<ITrace> = new MatTableDataSource<ITrace>(this.list);
  isLoading = true;
  numberOfRows: number = 30; 
  selectedIdTipoTraccia: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  range: FormGroup;
  startDateFilter: Date | undefined;
  endDateFilter: Date | undefined;


  private traceSubscription?: Subscription;

  private traceHubSubcription?: Subscription;
 
  constructor(private traceService: TraceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private traceHubService: TraceHubService
    ) { 
      let currentDate = new Date().toISOString().substring(0, 10);
      this.range = this._formBuilder.group({
        start: [currentDate],
        end: [currentDate]
      });
      this.startDateFilter = new Date(this.range.get('start')?.value);
      this.endDateFilter = new Date(this.range.get('end')?.value);


      this.traceHubService.startConnection()
      this.traceHubService.ReceveTracer();

     }
    

  ngAfterViewInit(): void {
      this.paginatorPage();
  }

  ngOnInit() {
    
    // this.getAllTracesByNumerOfRow();
    // this.numberOfRows=30;
    this.getTracesTypesByObservable();  
    this.filterData();

    this.traceSubscription = this.traceService.resetFilter$.subscribe(() => {
      this.range.get('start')?.setValue(null);
      this.range.get('end')?.setValue(null);
    });
    this.inItGetTrace();


    
    this.initgetTracerByObservble();
    

  }
  getAllTracesByNumerOfRow() {
    this.isLoading = true;
  
    let startControl = this.range.get('start');
    let endControl = this.range.get('end');

    this.startDateFilter = startControl?.value ? new Date(startControl.value) : undefined;
    this.endDateFilter = endControl?.value ? new Date(endControl.value) : undefined;
  
    this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia, undefined, this.startDateFilter, this.endDateFilter)
      .subscribe((traces: ITrace[]) => {
        traces.forEach(trace => {
          trace.dataOra = new Date(trace.dataOra);
        });
        this.list = traces;
        if(this.startDateFilter && this.endDateFilter) {
          this.list = this.list.filter(trace => trace?.dataOra && this.startDateFilter && trace.dataOra >= this.startDateFilter && this.endDateFilter && trace.dataOra <= this.endDateFilter);
        }

        if(this.selectedSocieta.length > 0) {
          this.list = this.list.filter(trace => trace.societa && this.selectedSocieta.includes(trace.societa));
        }
        this.dataSource.data = this.list;
        this.isLoading = false;
        this.applyFilters();
    });
  }
  
getAllTraces() {
    this.isLoading = true;
  
    let startControl = this.range.get('start');
    let endControl = this.range.get('end');

    let startDate: Date | undefined = startControl?.value ? new Date(startControl.value) : undefined;
    let endDate: Date | undefined = endControl?.value ? new Date(endControl.value) : undefined;
  
    this.traceService.getTraces(this.numberOfRows, this.selectedIdTipoTraccia, undefined, startDate, endDate)
      .subscribe((traces: ITrace[]) => {
        traces.forEach(trace => {
          trace.dataOra = new Date(trace.dataOra);
        });
        this.list = traces;
        this.dataSource.data = this.list;
        this.isLoading = false;
      });
}

getAllList(){
  this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia).subscribe(resp=>{
  });
}
resetList(){ 
  this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia).subscribe(resp=>{
    this.traces = resp;
    this.loadListFilter();
    this.dataSource.data = this.tracesFilter;
  });
  this.getAllTracesByNumerOfRow();
}

  loadListFilter(){
    this.tracesFilter = this.traces;
    this.isFilter = false;
    if(this.sopFilter !== ""){ 
      this.isFilter = true;
    }
    if(this.citFilter !== ""){ 
      this.isFilter = true;
    }
    if(this.co2Filter !== ""){ 
      this.isFilter = true;
    }
    if(this.giaFilter !== ""){ 
      this.isFilter = true;
    }
    if(this.isFilter){ 
      this.tracesFilter = this.tracesFilter.filter(x=>x.societa==this.sopFilter || x.societa==this.citFilter || x.societa==this.co2Filter || x.societa==this.giaFilter);
    }
    this.traceService.setTracesObservable=this.tracesFilter;
  }
  applyFilters() {
    const startDateFilter = this.startDateFilter;
    const endDateFilter = this.endDateFilter;
    let filteredList: ITrace[] = [];
    
    if (Array.isArray(this.list) && startDateFilter !== undefined && endDateFilter !== undefined) {
      filteredList = this.list.filter((trace) => {
        if (trace?.dataOra !== undefined) {
          const traceDate = new Date(trace.dataOra);
          const isInRange = traceDate >= startDateFilter && traceDate <= endDateFilter;
          return isInRange;
        }
        return false;
      });
    }
    this.list = filteredList;
  }
  filterData(){

  this.range = this._formBuilder.group({
    start: [],
    end: []
  }); 
  this.range.get('start')?.valueChanges.subscribe(value => {
    this.startDateFilter = new Date(value);
    this.getAllTracesByNumerOfRow();
  });

  this.range.get('end')?.valueChanges.subscribe(value => {
    this.endDateFilter = new Date(value);
    this.getAllTracesByNumerOfRow();
  });
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  onNumberOfRowsChange(value: number) {
    this.numberOfRows = value;
    this.getAllTracesByNumerOfRow();
    this.applyFilters();
    this.resetList();
  }
  onSelectedIdTipoTracciaChange(idTipoTraccia: number) {
    this.selectedIdTipoTraccia = idTipoTraccia;
    this.getAllTracesByNumerOfRow();
  }

  getTracesTypesByObservable(){
    this.traceService.getTraceTypes().subscribe();
    this.traceService.getTraceTypesObservable.subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    }); 
  }

  onSelectedSocietaChange(selectedSocieta: string[]) {
    this.selectedSocieta = selectedSocieta;
    this.sopFilter = this.selectedSocieta.includes("SOP") ? "SOP" : "";
    this.citFilter = this.selectedSocieta.includes("CIT") ? "CIT" : "";
    this.co2Filter = this.selectedSocieta.includes("CO2") ? "CO2" : "";
    this.giaFilter = this.selectedSocieta.includes("GIA") ? "GIA" : "";
    this.getAllTracesByNumerOfRow();
  }

  inItGetTrace(){
    this.numberOfRows=30;
    this.selectedIdTipoTraccia=3;
    this.getAllTracesByNumerOfRow();
    this.applyFilters();
    this.resetList();


  initgetTracerByObservble(){
    this.traceHubSubcription = this.traceHubService.GetIsTracerRefreshObservalbe.subscribe(rep => {
      console.log("initgetTracerByObservble");
      this.reloadAllList();
    });
  }

  reloadAllList(){
      this.getAllTracesByNumerOfRow();
      this.getTracesTypesByObservable();  
      this.filterData();
      console.log("Carica all List");

  }
}
  
