import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ITipoTraccia } from 'src/app/models/ITipoTraccia';
import { ITrace } from 'src/app/models/ITrace';
import { TraceService } from 'src/app/services/trace.service';

@Component({
  selector: 'app-client-trace-filter',
  templateUrl: './client-trace-filter.component.html',
  styleUrls: ['./client-trace-filter.component.css']
})
export class ClientTraceFilterComponent implements OnInit {
  @Output() numberOfRowsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedIdTipoTracciaChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedSocietaChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() startDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() endDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  numberOfRows: number = 500; 
  selectedIdTipoTraccia: number = 3;
  tracciaTypes: ITipoTraccia[] = [];
  selectedSocieta: string[] = [];
  isFilter: boolean = false;
  formSocieta = this._formBuilder.group({
    sop: false,
    cit: false,
    co2: false,
    gia: false,
  });
  sopFilter: string = "";
  citFilter:  string = "";
  giaFilter: string = "";
  co2Filter: string = "";
  traces:ITrace[] = [];
  tracesFilter: ITrace[] = [];
  isInputEnabled: boolean = false;
  initTraces: ITrace[] = [];
  startDateFilter: Date | undefined;
  endDateFilter: Date | undefined;
  descrizioneFilter: string = "";

  constructor(private traceService: TraceService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.traceService.getTraceTypes().subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    });
     this.onCheckListSocieta();
     this.traceService.getTracesInitObservable.subscribe(resp=>{
      this.initTraces = resp;
      // this.loadListFilter();
    });
    // this.traceService.getStartDateObservable.subscribe(resp=>{
    //   this.startDateFilter = this.resp;
    // });
    // this.traceService.getStartDateObservable.subscribe(resp=>{
    //   this.startDateFilter = resp;
    //   console.log("data inizio Observable:", this.startDateFilter);
    // });
    // this.traceService.getEndDateObservable.subscribe(resp=>{
    //   this.endDateFilter = resp;
    // });
    // this.traceService.getDescriptionObservable.subscribe(resp=>{
    //   this.descrizioneFilter = resp;
    //   console.log("descrizioneObservble", this.descrizioneFilter);
    // });

    
    // this.traceService.getTracerByObservble(this.numberOfRows, this.selectedIdTipoTraccia, this.startDateFilter, this.endDateFilter, this.descrizioneFilter).subscribe(resp=>{
    //   this.initTraces = resp;
    //   console.log("Filter observable:", resp);
    // })
  }
  resetFilters() {
    this.selectedIdTipoTraccia = 0;
    this.selectedSocieta = [];
    this.formSocieta.reset({
      sop: false,
      cit: false,
      co2: false,
      gia: false,
    });
    // this.numberOfRows = 30;
    this.traceService.resetAllFilters();
  }
  
  updateList() {
    
    this.numberOfRowsChange.emit(this.numberOfRows);
    this.selectedIdTipoTracciaChange.emit(this.selectedIdTipoTraccia);
    this.selectedSocietaChange.emit(this.selectedSocieta);
  }
  // onCheckListSocieta() {
  //   this.formSocieta.get("sop")?.valueChanges.subscribe(resp => {
  //     if (resp !== null) {
  //       this.updateSelectedSocieta("SOP", resp);
  //     } else {
  //       this.updateSelectedSocieta("SOP", false);
  //     }
  //   });
  
  //   this.formSocieta.get("cit")?.valueChanges.subscribe(resp => {
  //     if (resp !== null) {
  //       this.updateSelectedSocieta("CIT", resp);
  //     } else {
  //       this.updateSelectedSocieta("CIT", false);
  //     }
  //   });
  
  //   this.formSocieta.get("co2")?.valueChanges.subscribe(resp => {
  //     if (resp !== null) {
  //       this.updateSelectedSocieta("CO2", resp);
  //     } else {
  //       this.updateSelectedSocieta("CO2", false);
  //     }
  //   });
  
  //   this.formSocieta.get("gia")?.valueChanges.subscribe(resp => {
  //     if (resp !== null) {
  //       this.updateSelectedSocieta("GIA", resp);
  //     } else {
  //       this.updateSelectedSocieta("GIA", false);
  //     }
  //   });
  // }
  loadListFilter(){
    this.tracesFilter = this.initTraces;
    this.isFilter = false;
    if(this.sopFilter !== ""){ 
      this.isFilter = true;
      console.log("sopfilter", this.sopFilter);
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
      console.log("tracefilter,sop", this.tracesFilter);
    }
    console.log("traceFilter", this.tracesFilter);
    console.log("inittrace", this.initTraces);
    this.traceService.setTracesObservable=this.tracesFilter;
  }
    onCheckListSocieta() {
    this.formSocieta.get("sop")?.valueChanges.subscribe(resp => {
      if (resp) {
        this.sopFilter = "SOP";
      } else {
        console.log("rispostaSOP:", resp);
        this.sopFilter = "";
      }
      this.loadListFilter();
    });
  
    this.formSocieta.get("cit")?.valueChanges.subscribe(resp => {
      if (resp) {
        this.citFilter = "CIT";
     
      } else {
       this.citFilter = "";
      }
      this.loadListFilter();
    });
  
    this.formSocieta.get("co2")?.valueChanges.subscribe(resp => {
      if (resp) {
        this.co2Filter = "CO2";
      } else {
       this.co2Filter = "";
      }
      this.loadListFilter();
    });
  
    this.formSocieta.get("gia")?.valueChanges.subscribe(resp => {
      if (resp) {
        this.giaFilter = "GIA";
      } else {
        this.giaFilter = "";
        
      }
      this.loadListFilter();
    });
  }
  updateSelectedSocieta(societa: string, checked: boolean) {
    if (checked) {
      this.selectedSocieta.push(societa);
    } else {
      this.selectedSocieta = this.selectedSocieta.filter(x => x!== societa);
    }
    this.selectedSocietaChange.emit(this.selectedSocieta);
    console.log(this.selectedSocieta);
  }

  
}
