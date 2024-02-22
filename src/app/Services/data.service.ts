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
  storeId: string =''
  // home-ecommerce-ts
  showInputLink: boolean = false;
  inputLinkVisibility: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  urls: { [key: number]: string } = {
    1: 'assets/images/ecommerce-home-dresses.svg',
    3: 'assets/images/ecommerce-home-tops.svg',
    4: 'assets/images/ecommerce-home-accesories.svg',
    5: 'assets/images/ecommerce-home-sneakers.svg',
    6: 'assets/images/ecommerce-home-two-ladies.svg',
  };
  products:any = []
  constructor() { }
}
