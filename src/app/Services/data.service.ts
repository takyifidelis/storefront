import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  merchantDashboardNoProjects: boolean = false;
  doesNotExist = {exist: false, term:''}
  isMobileBool: boolean = false;
  isEditable: boolean = false;
  customerId: string = '';
  orderId: string =''
  storeId: string = '';
  constructor() { }
}
