import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  merchantDashboardNoProjects:boolean = false;
  doesNotExist = {exist:false, term:''}
  constructor() { }
}
