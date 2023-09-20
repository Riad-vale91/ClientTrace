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

  numberOfRows: number = 100; 
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
  isInputEnabled: boolean = false;


  constructor(private traceService: TraceService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.traceService.getTraceTypes().subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    });
    this.onCheckListSocieta();
    
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
    this.resetFilters();
    this.numberOfRowsChange.emit(this.numberOfRows);
    this.selectedIdTipoTracciaChange.emit(this.selectedIdTipoTraccia);
    this.selectedSocietaChange.emit(this.selectedSocieta);
  }
  onCheckListSocieta() {
    this.formSocieta.get("sop")?.valueChanges.subscribe(resp => {
      if (resp !== null) {
        this.updateSelectedSocieta("SOP", resp);
      } else {
        this.updateSelectedSocieta("SOP", false);
      }
    });
  
    this.formSocieta.get("cit")?.valueChanges.subscribe(resp => {
      if (resp !== null) {
        this.updateSelectedSocieta("CIT", resp);
      } else {
        this.updateSelectedSocieta("CIT", false);
      }
    });
  
    this.formSocieta.get("co2")?.valueChanges.subscribe(resp => {
      if (resp !== null) {
        this.updateSelectedSocieta("CO2", resp);
      } else {
        this.updateSelectedSocieta("CO2", false);
      }
    });
  
    this.formSocieta.get("gia")?.valueChanges.subscribe(resp => {
      if (resp !== null) {
        this.updateSelectedSocieta("GIA", resp);
      } else {
        this.updateSelectedSocieta("GIA", false);
      }
    });
  }
  
  updateSelectedSocieta(societa: string, checked: boolean) {
    if (checked) {
      this.selectedSocieta.push(societa);
    } else {
      this.selectedSocieta = this.selectedSocieta.filter(x => x!== societa);
    }
    this.selectedSocietaChange.emit(this.selectedSocieta);
  }
  
}
