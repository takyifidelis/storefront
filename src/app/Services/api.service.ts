import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserCredentials } from '../interfaces/all-interfaces';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

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

  

  getStore(businessId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all`,
    {
      withCredentials: true,
    })
  }
  getStoreProducts(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-store-products/${storeId}`,
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
}
