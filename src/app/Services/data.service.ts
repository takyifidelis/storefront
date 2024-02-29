import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/all-interfaces';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  merchantDashboardNoProjects: boolean = false;
  doesNotExist = {exist: false, term:''}
  isMobileBool: boolean = false;
  isLoading = false;
  isEditable: boolean = false;
  customerId: string = '';
  orderId: string =''
  storeId: string = localStorage.getItem('storeId')||''
  merchantBusinessType1: string = ''
  merchantStoreName: string  = ''
  isInEditMode:boolean = false
  productId: string = '';
  loginCredentials:UserCredentials = {email:'', password:''}
  ecommerceWebsite: string= ''
  businessId: string = ''
  typesOfStore = ["online", "offline"]
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
  cart:any=[]
  products:any = []
  productCategories:any = []
  productSearchString:string = ''
  template:any
  constructor() { }
}
