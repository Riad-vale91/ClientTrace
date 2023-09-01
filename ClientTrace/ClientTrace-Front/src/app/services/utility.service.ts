import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  ExistsListBehaviorSubject(data: any, listBehaviorSubject$: any): boolean{
    return !(listBehaviorSubject$.value === '' || JSON.stringify(listBehaviorSubject$.value)!== JSON.stringify(data));
  }
}
