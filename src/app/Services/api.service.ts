import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserCredentials } from '../interfaces/all-interfaces';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, public dataService: DataService) {}

  merchantSignup(user: UserCredentials): Observable<Response> {
    return this.http
      .post<Response>(
        `${environment.baseApiUrl}/account/register/local`,
        user,
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  verifySignup(user: UserCredentials): Observable<Response> {
    return this.http
      .post<Response>(`${environment.baseApiUrl}/account/verify`, user, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
  authenticateUser(user: UserCredentials): Observable<Response> {
    return this.http
      .post<Response>(`${environment.baseApiUrl}/account/login/local`, user, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getMerchantStores(businessId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/business/get-stores/${businessId}`,
      {
        withCredentials: true,
      }
    );
  }

  getStore(businessId: string): Observable<Response> {
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all`, {
      withCredentials: true,
    });
  }

  initializePayment(customerId: string, cart: any): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/order/initialize/${customerId}`,
      cart,
      {
        withCredentials: true,
      }
    );
  }

  addShipping(customerId: string, user: any) {
    return this.http.post(
      `${environment.baseApiUrl}/customer/add-shipping-address/${customerId}`,
      user
    );
  }
  // getStoreProducts(storeId: string): Observable<Response>{
  //   return this.http.get<Response>(`${environment.baseApiUrl}/store/get-store-products/${storeId}`,
  //   {
  //     withCredentials: true,
  //   })
  // }
  getStoreProducts(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/product/get-all-products/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  getOneProducts(productId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/product/${productId}`,
      {
        withCredentials: true,
      }
    );
  }

  saveTemplateDraft(storeId: string, template: any): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/store/save-template-draft/${storeId}`,
      template,
      {
        withCredentials: true,
      }
    );
  }
  publishTemplate(storeId: string, template: any): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/store/publish-template/${storeId}`,
      template,
      {
        withCredentials: true,
      }
    );
  }

  // Error Handling
  private handleError(errorRes: HttpErrorResponse) {
    console.error('Error Response:', errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.code) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.code) {
      case 'EMAIL_ALREADY_IN_USE':
        errorMessage = 'This email already exists';
        break;
      case 'LOGIN_FAILED':
        errorMessage = 'Incorrect email or password';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Incorrect email or password';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email or password';
        break;
      case 'NOT_FOUND':
        errorMessage = 'Incorrect token';
        break;
      case 'ACCOUNT_NOT_FOUND':
        errorMessage = 'Incorrect email';
        break;
    }
    return throwError(errorMessage);
  }
}
