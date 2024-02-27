import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserCredentials } from '../interfaces/all-interfaces';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, public dataService: DataService) { }
 

  merchantSignup(user:UserCredentials): Observable<Response> {
    return this.http.post<Response>(`${environment.baseApiUrl}/account/register/local`, user,
    {
      withCredentials: true,
    })
  }
  verifySignup(user:UserCredentials): Observable<Response> {
    return this.http.post<Response>(`${environment.baseApiUrl}/account/verify`, user,
    {
      withCredentials: true,
    })
  }
  authenticateUser(user:UserCredentials): Observable<Response> {
    return this.http.post<Response>(`${environment.baseApiUrl}/account/login/local`, user,
    {
      withCredentials: true,
    })
  }

  getMerchantStores(businessId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/business/get-stores/${businessId}`,
    {
      withCredentials: true,
    })
  }

  getStore(businessId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all`,
    {
      withCredentials: true,
    })
  }

initializePayment(customerId:string, cart:any): Observable<Response> {
  return this.http.post<Response>(`${environment.baseApiUrl}/order/initialize/${customerId}`, cart, {
    withCredentials: true,
  })
}

addShipping(customerId: string, user: any) {
  return this.http.post(`${environment.baseApiUrl}/customer/add-shipping-address/${customerId}`, user)
}
  getStoreProductsCustomer(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-store-products/${storeId}`,
    {
      withCredentials: true,
    })
  }
  
  getStoreProductsMerchant(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/product/get-all-products/${storeId}`,
    {
      withCredentials: true,
    })
  }

  getOneProducts(productId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/product/${productId}`,
    {
      withCredentials: true,
    })
  }


  saveTemplateDraft(storeId: string, template:any): Observable<Response>{
    return this.http.patch<Response>(`${environment.baseApiUrl}/store/save-template-draft/${storeId}`,
    template, {
      withCredentials: true,
    })
  }

  publishTemplate(storeId: string, template:any): Observable<Response>{
    return this.http.patch<Response>(`${environment.baseApiUrl}/store/publish-template/${storeId}`,
    template, {
      withCredentials: true,
    })
  }

  addTOViews(customerId: string, products: any): Observable<Response>{
    return this.http.post<Response>(`${environment.baseApiUrl}/customer/add-to-views/${customerId}`, products, {
      withCredentials: true,
    })
  }
}


// initializePayment(user: UserCredentials) {

// }
