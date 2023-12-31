import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { ITrace } from '../models/ITrace';
import { ITipoTraccia } from '../models/ITipoTraccia';
import { environment } from 'src/environments/environment';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class TraceService {

  private url =  base_url + '/api/Trace/traces';
  private urlTipoTraccia = base_url + '/api/Types/traceTypes'; 

  // private url = 'http://localhost:5288/api/Trace/traces';
  // private urlTipoTraccia = 'http://localhost:5288/api/Types/traceTypes'; 

  //private url = 'https://traceninja.sopranciodue.it:447/api/Trace/traces';
  //private urlTipoTraccia = 'https://traceninja.sopranciodue.it:447/api/Types/traceTypes'; 

  constructor(private httpClient: HttpClient) { }

  private _tracesBehavior = new BehaviorSubject<ITrace[]>([]);
  private _traceTypesBehavior = new BehaviorSubject<ITipoTraccia[]>([]);
  private societaFilter = new BehaviorSubject<string[]>([]);
  private resetFilterSubject = new Subject<void>();
  resetFilter$ = this.resetFilterSubject.asObservable();

  

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
    let tempStartDate = new Date("1900-01-01");
    let tempEndDate = new Date("1900-01-01");
    if (idTipoTraccia !== undefined && idTipoTraccia !== 0) {  
      params = params.set('idTipoTraccia', idTipoTraccia.toString());
    }
    if (societa) {
      params = params.set('societa', societa);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
      tempStartDate = startDate;
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
      tempEndDate = endDate;
    }
    console.log("params", params);
   
    console.log("startDate",startDate);
    console.log("endDate", endDate);
    // return this.httpClient.get<ITrace[]>(this.url, {params}).pipe( 
      return this.httpClient.get<ITrace[]>(this.url+"?numberOfRows="+ numberOfRows +"&startDate="+ tempStartDate.toISOString() +"&endDate="+ tempEndDate.toDateString() +"&IdTipoTraccia="+ idTipoTraccia +"").pipe(
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
  resetAllFilters() {
    this.resetFilterSubject.next();
  }
}


