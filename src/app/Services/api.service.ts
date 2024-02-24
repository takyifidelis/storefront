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

  getStores(): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/api/store/get-all`, {
      withCredentials: true,
     });
  }

  authenticateUser(user: UserCredentials): Observable<any> {
    return this.http.post<Response>(`${environment.baseApiUrl}/account/login/local`, user, {
      withCredentials: true,
    })
  }


initializePayment(customerId:string, cart:any): Observable<Response> {
  return this.http.post<Response>(`${environment.baseApiUrl}/order/initialize/${customerId}`, cart, {
    withCredentials: true,
  })
}
}


// initializePayment(user: UserCredentials) {

// }
