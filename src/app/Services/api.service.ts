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
  // Verify account
  verifyAccount(code: string) {
    return this.http
      .post<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/verify',
        {
          code,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Password Verification
  verifyPassword(code: string) {
    return this.http
      .post<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/password/resetCode/verify',
        {
          code,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  newPasswordReset(password: string, confirmPassword: string) {
    return this.http
      .put<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/password/reset',
        {
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  authenticateUser(user: UserCredentials): Observable<Response> {
    return this.http
      .post<Response>(`${environment.baseApiUrl}/account/login/local`, user, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  setBusinessType(businessId: string, data: {}): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/business/set-business-type/${businessId}`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  logout() {
    return this.http
      .get<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/logout',
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }


  createStore(businessId: string, data:{[key:string]:any}): Observable<Response>{
    return this.http.post<Response>(`${environment.baseApiUrl}/business/create-new-store/${businessId}`,
    data,{
      withCredentials: true,
    })

  }
  getMerchantStores(businessId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/business/get-stores/${businessId}`,
      {
        withCredentials: true,
      }
    );
  }
  getPublishedTemp(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-temp/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }
  getStore(storeId: string): Observable<Response> {
    return this.http.get<Response>(`${environment.baseApiUrl}/api/store/get-store/${storeId}`, {
      withCredentials: true,
    });
  }

  getStores(): Observable<Response> {
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all`, {
      withCredentials: true,
    });
  }

  getStoresForMerchant(businessId: string): Observable<Response> {
    return this.http.get<Response>(`${environment.baseApiUrl}/business/get-stores/${businessId}`,{
      withCredentials: true
    })
  }

getCustomers(): Observable<Response> {
  return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all-customers/f739a921-7267-4e02-8222-ceb2b4c352cf`, {
    withCredentials: true
  })
}


getGoogle(): Observable<Response>{
  return this.http.get<Response>(`${environment.baseApiUrl}/account/google/auth`,
  {
    withCredentials: true,
  })
}

AddStoreCategories(storeId: string, categoryName:{[key:string]:string[]}): Observable<Response>{
  return this.http.post<Response>(`${environment.baseApiUrl}/store/add-category/${storeId}`,
  categoryName,{
    withCredentials: true,
  })
}


  getStoreCategories(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-categories/${storeId}`,
    {
      withCredentials: true,
    })
  }

initializePayment(customerId: string, cart:any): Observable<Response> {
  return this.http.post<Response>(`${environment.baseApiUrl}/order/initialize/${customerId}`, cart, {

    withCredentials: true,
  })
} 

orderDelivered(orderId: string): Observable<Response> {
  return this.http.patch<Response>(`${environment.baseApiUrl}/order/delivered/${orderId}`,{},{
    withCredentials: true
  })
}


orderShipped(orderId: string): Observable<Response> {
  return this.http.patch<Response>(`${environment.baseApiUrl}/order/shipped/${orderId}`,{},{
    withCredentials: true
  })
}

getWallet(storeId: string): Observable<Response> {
  return this.http.get<Response>(`${environment.baseApiUrl}/store/get-wallets/${storeId}`, {
    withCredentials: true
  })
}


  addShipping(customerId: string, user: any) {
    return this.http.post(
      `${environment.baseApiUrl}/customer/add-shipping-address/${customerId}`,
      user,
      {
        withCredentials: true,
      }
    );
  }


  getStoreProductsMerchant(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/product/get-all-products/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }
  getAllShippingAddresses(customerId: string) {
    return this.http.get(
      `${environment.baseApiUrl}/customer/get-shipping-addresses/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }
  onApprovePayment(orderId: string): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/order/approve-payment/${orderId}`,
      {
        withCredentials: true,
      }
    );
  }

  getCustomerStoreProducts(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-store-products/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

getStoreProducts(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/product/get-all-products/${storeId}`,
    {
      withCredentials: true,
    })
  }
postProduct(formData: FormData, storeId: string) {

    return this.http
      .post<Response>(
        `https://storefront-backend-jan-dev-api.vercel.app/api/product/add/${storeId}`,
        formData,
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }


  addTOViews(products: any): Observable<Response>{
    return this.http.post<Response>(`${environment.baseApiUrl}/customer/add-to-views/f739a921-7267-4e02-8222-ceb2b4c352cf`, products, {
      withCredentials: true,
    })
  }


  

  getOrders(customerId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/customer/get-orders/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }

  addToFavourite(products: any): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/add-to-views/f739a921-7267-4e02-8222-ceb2b4c352cf`,
      products,
      {
        withCredentials: true,
      }
    );
  }

  getSavedProducts(): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/customer/get-saved-products/f739a921-7267-4e02-8222-ceb2b4c352cf/?idOnly=true&likedOnly=true`,
      {
        withCredentials: true,
      }
    );
  }

  getHistoryProducts(): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/customer/get-saved-products/f739a921-7267-4e02-8222-ceb2b4c352cf`,
      {
        withCredentials: true,
      }
    );
  }


  removeProducts() {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/customer/remove-products-from-favorites/f739a921-7267-4e02-8222-ceb2b4c352cf`,
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

  // Password Reset
  passwordReset(email: string) {
    return this.http
      .post<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/request/password/reset',
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  //Resend Verification Code
  resendCode() {
    return this.http
      .get(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/resend/code',
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }

  reviewProduct(review: { [key: string]: any }, order_id: string) {
    return this.http
      .post<Response>(
        `${environment.baseApiUrl}/customer/review-product/${order_id}`,
        review,
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getSingleOrder(id: string) {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/order/get-single-order/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  replyReview(comment: string, review: string, storeId: string) {
    return this.http
      .post<Response>(
        `https://storefront-backend-jan-dev-api.vercel.app/api/store/reply-customer/${storeId}`,
        {
          comment,
          review,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getReviews(id:string): Observable<Response> {
    return this.http
      .get<Response>(
        `https://storefront-backend-jan-dev-api.vercel.app/api/store/get-reviews/${id}`,
        { withCredentials: true }
      )

      .pipe(catchError(this.handleError));
  }

  getOrdersForMerchant(storeId: string): Observable<Response> {
    return this.http.get<Response>(`${environment.baseApiUrl}/store/get-all-orders/${storeId}`, {
      withCredentials: true
    })
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
        errorMessage = 'Incorrect email address';
        break;
      case 'EMAIL_VERIFICATION_FAILED':
        errorMessage = 'Email Verification Failed';
        break;
      case 'UNAUTHORIZED':
        errorMessage = 'Acces Denied';
        break;
      case 'RESET_PASSWORD_FAILED':
        errorMessage = 'Password reset failed';
        break;
    }
    return throwError(errorMessage);
  }
}
