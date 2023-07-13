import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITipoTraccia } from 'src/app/models/ITipoTraccia';
import { TraceService } from 'src/app/services/trace.service';

@Component({
  selector: 'app-client-trace-filter',
  templateUrl: './client-trace-filter.component.html',
  styleUrls: ['./client-trace-filter.component.css']
})
export class ClientTraceFilterComponent implements OnInit {
  @Output() numberOfRowsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedIdTipoTracciaChange: EventEmitter<number> = new EventEmitter<number>();

  numberOfRows: number = 20; 
  selectedIdTipoTraccia: number = 0;
  tracciaTypes: ITipoTraccia[] = [];

  constructor(private traceService: TraceService) { }

  ngOnInit() {
    this.traceService.getTraceTypes().subscribe((traceTypes: ITipoTraccia[]) => {
      this.tracciaTypes = traceTypes;
    });
  }

  updateList() {
    this.numberOfRowsChange.emit(this.numberOfRows);
    this.selectedIdTipoTracciaChange.emit(this.selectedIdTipoTraccia);
  }
}
