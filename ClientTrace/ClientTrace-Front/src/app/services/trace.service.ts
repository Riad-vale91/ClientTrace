import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITrace } from '../models/ITrace';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private url = 'http://localhost:5288/api/Trace/traces';  

  constructor(private http: HttpClient, router:Router) { 
    
  }

  getTraces(): Observable<ITrace[]> {
    return this.http.get<ITrace[]>(this.url)
      .pipe(
        tap(traces => console.log(traces)),  // Log the data
        catchError(error => {
          console.error('Error retrieving traces', error);  // Log any error
          throw error;
        })
      );
  }
  
  

}
