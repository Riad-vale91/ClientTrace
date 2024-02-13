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
  numberOfRows: number = 1000; 
  selectedIdTipoTraccia: number = 3;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  range: FormGroup;
  startDateFilter: Date | undefined;
  endDateFilter: Date | undefined;
  descrizioneFilter: string = "";


  private traceSubscription?: Subscription;

  private traceHubSubcription?: Subscription;
 
  constructor(private traceService: TraceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    //private traceHubService: TraceHubService
    ) { 
      let currentDate = new Date();
      this.range = this._formBuilder.group({
        start: [null],
        end: [null]
      });
      // console.log("calendario:", this.range.get('start')?.value)
      // this.startDateFilter = new Date(this.range.get('start')?.value);
      // this.endDateFilter = new Date(this.range.get('end')?.value);
      this.startDateFilter = this.range.get('start')?.value;
      this.endDateFilter = this.range.get('end')?.value;
      console.log("filtro data inizio:", this.startDateFilter);
      

      // this.traceHubService.startConnection()
      // this.traceHubService.ReceveTracer();

     }
    

  ngAfterViewInit(): void {
      this.paginatorPage();
      // this.dataSource.filterPredicate = (data: ITrace, filter: string) => {
      //   const descrizione = data.descrizione ? data.descrizione.toLowerCase() : '';
      //   return descrizione.includes(filter);
      // };
  }

  ngOnInit() {
    
    // this.getAllTracesByNumerOfRow();
    this.numberOfRows=1000;
    this.getTracesTypesByObservable();  
    this.filterData();

    // this.traceSubscription = this.traceService.resetFilter$.subscribe(() => {
    //   this.range.get('start')?.setValue(null);
    //   this.range.get('end')?.setValue(null);
    // });
    this.inItGetTrace();
    this.traceService.getTracesObservable.subscribe(resp=>{
      this.dataSource.data = resp; 
    })
    //this.initgetTracerByObservble();
  }

  getAllTracesByNumerOfRow(): void {
    this.isLoading = true;

    let startControl = this.range.get('start');
    let endControl = this.range.get('end');
    const filterValue = this.descrizioneFilter.trim().toLowerCase();

    this.startDateFilter = startControl?.value ? new Date(startControl.value): undefined;
    this.endDateFilter = endControl?.value ? new Date(endControl.value) : undefined;

    // if (this.startDateFilter) {
    //     this.startDateFilter.setUTCHours(0, 0, 0, 0); // Inizio della giornata
    // }
    // if (this.endDateFilter) {
    //     this.endDateFilter.setUTCHours(23, 59, 59, 999); // Fine della giornata
    // }
    // if (this.endDateFilter) {
    //        this.endDateFilter.setUTCHours(23, 59, 59, 999); // Fine della giornata
    //    }

    this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia !== null ? this.selectedIdTipoTraccia : undefined, this.startDateFilter, this.endDateFilter, filterValue)
        .subscribe((traces: ITrace[]) => {
          // this.traceService.setStartDateObservable = this.startDateFilter;
          // this.traceService.setStartDateObservable = this.endDateFilter;
          // console.log("traceOservable", traces);
            // traces.forEach(trace => {
            //     trace.dataOra = new Date(trace.dataOra);
            // });
            this.list = traces;
            // this.list = traces.filter(trace => 
            //     this.filterByDate(trace) 
            //     // this.filterBySocieta(trace) && 
            //     // this.filterByIdTipoTraccia(trace) &&
            //     // this.filterByDescrizione(trace) 
            // );
            

            // this.dataSource.data = this.list;    
            this.isLoading = false;
            this.traceService.setTracesObservable = traces;
            this.traceService.setTracesInitObservable = traces;
            //  this.list = traces.filter(trace => 
            //   // this.filterByDate(trace) &&
            // //  this.filterBySocieta(trace) && 
            //  this.filterByIdTipoTraccia(trace) 
            // //  this.filterByDescrizione(trace) 
            // );
            //  this.applyFilters();
            // this.loadListFilter();
        });
}


private filterByDate(trace: ITrace): boolean {
  if (this.startDateFilter && this.endDateFilter) {
      return trace?.dataOra && trace.dataOra >= this.startDateFilter && trace.dataOra <= this.endDateFilter;
  }
  return true; 
}

private filterBySocieta(trace: ITrace): boolean {
  
    if (this.selectedSocieta.length > 0) {
        return !!trace.societa && this.selectedSocieta.includes(trace.societa);
    }
    return true;
}

private filterByIdTipoTraccia(trace: ITrace): boolean {

    if (this.selectedIdTipoTraccia === null) {
        return true;
    }
    if (this.selectedIdTipoTraccia !== undefined) {
        return trace.idTipoTraccia === this.selectedIdTipoTraccia;
    }
    return true; 
}
private filterByDescrizione(trace: ITrace): boolean {
  if (this.descrizioneFilter.trim() !== "") {
      return trace.descrizione ? trace.descrizione.toLowerCase().includes(this.descrizioneFilter.trim().toLowerCase()) : false;
  }
  return true;
}

// getAllTracesByNumerOfRow() {
//   this.isLoading = true;

//   let startControl = this.range.get('start');
//   let endControl = this.range.get('end');

//   this.startDateFilter = startControl?.value ? new Date(startControl.value) : undefined;
//   this.endDateFilter = endControl?.value ? new Date(endControl.value) : undefined;

//   this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia, undefined, this.startDateFilter, this.endDateFilter)
//     .subscribe((traces: ITrace[]) => {
//       traces.forEach(trace => {
//         trace.dataOra = new Date(trace.dataOra);
//       });
//       this.list = traces;
//       if(this.startDateFilter && this.endDateFilter) {
//         this.list = this.list.filter(trace => trace?.dataOra && this.startDateFilter && trace.dataOra >= this.startDateFilter && this.endDateFilter && trace.dataOra <= this.endDateFilter);
//       }

//       if(this.selectedSocieta.length > 0) {
//         this.list = this.list.filter(trace => trace.societa && this.selectedSocieta.includes(trace.societa));
//       }
//       this.dataSource.data = this.list;
//       this.isLoading = false;
//       this.applyFilters();
//   });
// }

  
getAllTraces() {
    this.isLoading = true;
  
    let startControl = this.range.get('start');
    let endControl = this.range.get('end');

    let startDate: Date | undefined = startControl?.value ? new Date(startControl.value) : undefined;
    let endDate: Date | undefined = endControl?.value ? new Date(endControl.value) : undefined;
  
    this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia, startDate, endDate)
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
    // console.log("traceFilter", this.tracesFilter);
    this.traceService.setTracesObservable=this.tracesFilter;
  }
  applyFilters() {
    const startDateFilter = this.startDateFilter;
    const endDateFilter = this.endDateFilter;
    let filteredList: ITrace[] = [];
    console.log("dati inizio applyfilters()", startDateFilter);
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
  filterData() {
    this.range = this._formBuilder.group({
        start: [],
        end: []
    });

    this.range.get('start')?.valueChanges.subscribe(value => {
        this.startDateFilter = new Date(value);
        // this.startDateFilter.setMinutes(this.startDateFilter.getMinutes() - this.startDateFilter.getTimezoneOffset());
        this.startDateFilter.setMinutes(this.startDateFilter.getMinutes());
        this.getAllTracesByNumerOfRow();
    });

    this.range.get('end')?.valueChanges.subscribe(value => {

        this.endDateFilter = new Date(value);
        this.endDateFilter.setMinutes(this.endDateFilter.getMinutes());
        this.getAllTracesByNumerOfRow();
    });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return Object.entries(data).some(([key, val]) => {
      if (key === 'descrizione') {
        return false;
      }
      return val ? val.toString().toLowerCase().includes(filter) : false;
    });
  };

  this.dataSource.filter = filterValue;

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


  onRowClicked(row: ITrace) {
    this.dialog.open(TabellaDialogComponent, {
        width: '800px',
        data: row
    });
  }

  ngOnDestroy() {
    this.traceSubscription?.unsubscribe();
    this.traceHubSubcription?.unsubscribe();
}


  paginatorPage(){
    if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
  }
  onNumberOfRowsChange(value: number) {
    this.numberOfRows = value;
    
    setTimeout(() => {
      this.getAllTracesByNumerOfRow();
      this.applyFilters();
      this.resetList();
    }, 3000);
  }
  
  onSelectedIdTipoTracciaChange(idTipoTraccia: number) {
    this.selectedIdTipoTraccia = idTipoTraccia;
    if (this.descrizioneFilter && this.descrizioneFilter.trim() == null) {
      this.applyDescriptionFilter();
  } else {
      this.getAllTracesByNumerOfRow();
  }
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
    this.numberOfRows=500;
    this.selectedIdTipoTraccia=3;
    this.getAllTracesByNumerOfRow();
    this.applyFilters();
    this.resetList();

  }
  // initgetTracerByObservble(){
  //   this.traceHubSubcription = this.traceHubService.GetIsTracerRefreshObservalbe.subscribe(rep => {
  //     console.log("initgetTracerByObservble");
  //     this.reloadAllList();
  //   });
  // }

  reloadAllList(){
      this.getAllTracesByNumerOfRow();
      this.getTracesTypesByObservable();  
      this.filterData();
      // console.log("Carica all List");

  }
  applyDescriptionFilter() {
    const filterValue = this.descrizioneFilter.trim().toLowerCase();
    this.traceService.setDescriptionObservable = this.descrizioneFilter;
    console.log("applyDescripionFilter", this.descrizioneFilter);
    this.traceService.getTracerByObservble(
        this.numberOfRows,
        this.selectedIdTipoTraccia, 
        this.startDateFilter,
        this.endDateFilter,
        filterValue
    ).subscribe(data => {
        this.dataSource.data = data;
        this.traceService.setTracesInitObservable = data;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    });
}

applyAllFilters() {
  const filterValue = this.descrizioneFilter.trim().toLowerCase();
  const combinedSocieta = this.selectedSocieta.join(',');
  this.traceService.getTracerByObservble(
      this.numberOfRows,
      this.selectedIdTipoTraccia,
      this.startDateFilter,
      this.endDateFilter,
      filterValue
  ).subscribe(data => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  });
}


}
  
