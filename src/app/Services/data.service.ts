import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/all-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  merchantDashboardNoProjects: boolean = false;
  doesNotExist = {exist: false, term:''}
  isMobileBool: boolean = false;
  isEditable: boolean = false;

  loginCredentials:UserCredentials = {email:'', password:''}
  ecommerceWebsite: string= ''
  businessId: string = ''
  storeId: string = ''
  productId: string = '';
  constructor() { }
}
