import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITrace } from '../models/ITrace';
import { ITipoTraccia } from '../models/ITipoTraccia';

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private url = 'http://localhost:5288/api/Trace/traces';
  private urlTipoTraccia = 'http://localhost:5288/api/Trace/traceTypes'; 
  constructor(private http: HttpClient) { }

  getTraces(numberOfRows: number, idTipoTraccia: number): Observable<ITrace[]> {
    const params = new HttpParams()
      .set('numberOfRows', numberOfRows.toString())
      .set('idTipoTraccia', idTipoTraccia.toString());
    return this.http.get<ITrace[]>(this.url, { params })
      .pipe(
        tap(traces => console.log(traces)),
        catchError(error => {
          console.error('Error traces', error);
          throw error;
        })
      );
  }

  getTraceTypes(): Observable<ITipoTraccia[]> {
    return this.http.get<ITipoTraccia[]>(this.urlTipoTraccia)
      .pipe(
        tap(traceTypes => console.log(traceTypes)),
        catchError(error => {
          console.error('Error trace types', error);
          throw error;
        })
      );
  }
}

