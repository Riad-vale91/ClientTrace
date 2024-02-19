import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, catchError, debounceTime, map, tap } from 'rxjs';
import { ITipoTraccia } from 'src/app/models/ITipoTraccia';
import { TraceService } from 'src/app/services/trace.service';

@Component({
  selector: 'app-trace-filter',
  templateUrl: './trace-filter.component.html',
  styleUrls: ['./trace-filter.component.css']
})
export class TraceFilterComponent implements OnInit, OnDestroy{
  isLoading = true;
  numberOfRows: number = 100;
  private tipiTracciaSubscription?: Subscription;

  //priprietà per il filtro
  idTipoTraccia: number = 3;
  startDate: Date | undefined;
  endDate: Date | undefined;
  descrizione: string = "";
  sop: string = "";
  cit: string = "";
  co2: string = "";
  gia: string = "";
  //fine proprietà per il filtro

  tracciaTypes: ITipoTraccia[] = [];
  formFilter: FormGroup;

  constructor(private fb: FormBuilder, private traceService: TraceService) { 
    this.formFilter = this.fb.group({
      sop: [''],
      cit: [''],
      co2: [''],
      gia: [''],
      idTipoTraccia: [this.idTipoTraccia],
      numeroRighe: [this.numberOfRows],
      descrizione: [''],
      start:[null],
      end: [null]
    })
  }
  ngOnDestroy(): void {
    this.tipiTracciaSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadTipiTraccia();
    this.filter();
    this.loadAllTraces();
  }

  loadAllTraces() {
    this.isLoading = true;
    this.traceService.getTracerByObservble(
      this.numberOfRows, 
      this.idTipoTraccia, 
      this.startDate, 
      this.endDate,
      this.descrizione,
      this.sop,
      this.cit,
      this.co2,
      this.gia
      ).pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(error);
          alert(error.message.toString());
          throw error;
        })
      ).subscribe((traces)=>{
          this.traceService.setTracesObservable = traces;
          this.isLoading = false;
      });
  }

  changeTipoTraccia(event: any) {
    let idTipotraccia = Number(event.value);
    this.traceService.setIdTraceTypeObservable = idTipotraccia
  }

  loadTipiTraccia(){
    this.tipiTracciaSubscription = this.traceService.getTraceTypes().subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    });
  }

  filter(){
    this.traceService.getIdTraceTypeObservable.subscribe((idTipoTraccia) => {
      this.idTipoTraccia = idTipoTraccia;
      this.loadAllTraces();
    });

    this.formFilter.get("numeroRighe")?.valueChanges.pipe(
      debounceTime(2000),
    )
    .subscribe(value =>{
      if(value == null) {
        return;
      }
      this.numberOfRows = value;
      this.loadAllTraces();
    });

    this.formFilter.get("descrizione")?.valueChanges.pipe(
      debounceTime(2000),
    ).subscribe(value =>{
      this.descrizione = value;
      this.loadAllTraces();
    });

    this.formFilter.get("start")?.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(value =>{
      this.startDate = value;
      this.loadAllTraces();
    });

    this.formFilter.get("end")?.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(value =>{
      this.endDate = value;
      this.loadAllTraces();
    });

    this.formFilter.get("sop")?.valueChanges.subscribe(value =>{
      this.sop = ""
      if(value == true) {
        this.sop = "SOP";
      }
      this.loadAllTraces();
    });

    this.formFilter.get("cit")?.valueChanges.subscribe(value =>{
      this.cit = "";
      if(value == true) {
        this.cit = "CIT";
      }
      this.loadAllTraces();
    });

    this.formFilter.get("co2")?.valueChanges.subscribe(value =>{
      this.co2 = "";
      if(value == true) {
        this.co2 = "CO2";
      }
      this.loadAllTraces();
    });

    this.formFilter.get("gia")?.valueChanges.subscribe(value =>{
      this.gia = "";
      if(value == true) {
        this.gia = "GIA";
      }
      this.loadAllTraces();
    });
  }
}
