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

  getMerchantStores(businessId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/business/get-stores/${businessId}`,
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
  postProduct(formData: FormData) {
    return this.http
      .post<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/product/add/f9586428-62e3-4455-bb1d-61262a407d1a',

        formData,

        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
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
  getReviews(): Observable<Response> {
    return this.http
      .get<Response>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/store/get-reviews/22095521-d6e3-4ed1-a7de-e96e1f81bed3',
        { withCredentials: true }
      )

      .pipe(catchError(this.handleError));
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
