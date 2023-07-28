import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ITrace } from '../models/ITrace';
import { ITipoTraccia } from '../models/ITipoTraccia';

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private url = 'http://localhost:5288/api/Trace/traces';
  private urlTipoTraccia = 'http://localhost:5288/api/Types/traceTypes'; 
  constructor(private httpClient: HttpClient) { }

  private _tracesBehavior = new BehaviorSubject<ITrace[]>([]);
  private _traceTypesBehavior = new BehaviorSubject<ITipoTraccia[]>([]);
  private societaFilter = new BehaviorSubject<string[]>([]);
private dateFilter = new BehaviorSubject<{start: Date, end: Date}>({start: new Date(), end: new Date()});

  

  get getTracesObservable()
  {
    return this._tracesBehavior.asObservable();
  }
  set setTracesObservable(traces:ITrace[])
  {
    this._tracesBehavior.next(traces);
  }

  get getTraceTypesObservable() {
    
    return this._traceTypesBehavior.asObservable();
  }
  set setTraceTypesObservable(traceTypes:ITipoTraccia[]) {
    this._traceTypesBehavior.next(traceTypes);
  }
  setSocietaFilter(societa: string[]) {
    this.societaFilter.next(societa);
}

setDateFilter(start: Date, end: Date) {
    this.dateFilter.next({start, end});
}


  getTraces(numberOfRows: number, idTipoTraccia?: number, societa?: string, startDate?: Date, endDate?: Date): Observable<ITrace[]> {
    let params = new HttpParams().set('numberOfRows', numberOfRows.toString());
    if (idTipoTraccia !== undefined && idTipoTraccia !== 0) {  
      params = params.set('idTipoTraccia', idTipoTraccia.toString());
    }
    if (societa) {
      params = params.set('societa', societa);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.httpClient.get<ITrace[]>(this.url, { params })
      .pipe(
        tap(traces => console.log(traces)),
        catchError(error => {
          console.error('Error traces', error);
          throw error;
        })
      );
  }

  getTracerByObservble(numberOfRows: number, idTipoTraccia?: number, societa?: string, startDate?: Date, endDate?: Date): Observable<ITrace[]> {
    let params = new HttpParams().set('numberOfRows', numberOfRows.toString());
    if (idTipoTraccia !== undefined && idTipoTraccia !== 0) {  
      params = params.set('idTipoTraccia', idTipoTraccia.toString());
    }
    if (societa) {
      params = params.set('societa', societa);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    return this.httpClient.get<ITrace[]>(this.url, {params}).pipe(
      tap((resp: ITrace[]) => {
        const currentTraces = this._tracesBehavior.getValue();
        const updatedTraces = [...currentTraces, ...resp];
        this._tracesBehavior.next(updatedTraces);
      })
    );
  }
  

  resetTracer(numberOfRows: number, idTipoTraccia?: number, societa?: string, startDate?: Date, endDate?: Date): Observable<ITrace[]> {
    let params = new HttpParams().set('numberOfRows', numberOfRows.toString());
    if (idTipoTraccia !== undefined && idTipoTraccia !== 0) {  
      params = params.set('idTipoTraccia', idTipoTraccia.toString());
    }
    if (societa) {
      params = params.set('societa', societa);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.httpClient.get<ITrace[]>(this.url, {params}).pipe(
      tap((resp: ITrace[]) => {
        this.setTracesObservable = resp;
      })
    );
}

  

  getTraceTypes(): Observable<ITipoTraccia[]> {
    return this.httpClient.get<ITipoTraccia[]>(this.urlTipoTraccia)
      .pipe(
        tap(traceTypes => {
          this.setTraceTypesObservable = traceTypes;
        }),
        catchError(error => {
          console.error('Error trace types', error);
          throw error;
        })
      );
  }
}


