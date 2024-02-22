import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  ForgetPasswordResponse,
  ResetPasswordResponse,
  SignupResponseData,
} from '../Auth/api.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
interface BusinessStores {
  code: string;
  message: string;
  type: string;
  data?: {
    id: string;
    storeName: string;
    storeType: string;
    currency: string;
  };
  error?: {
    validation: string;
    message: string;
    path: string[];
  }[];
}

interface ProductResponse {
  name: string;
  price: number;
  quantity: number;
  description: string;
  isActive: boolean;
  category: string;
  images: string;
  variation?: {
    value: string;
    type: string;
  };
  error?: {
    validation: string;
    message: string;
    path: string[];
  }[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signupMerchant(
    businessName: string,
    email: string,
    type: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http
      .post<SignupResponseData>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/register/local',
        {
          businessName,
          email,
          type,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  signupCustomer(
    firstName: string,
    lastName: string,
    email: string,
    type: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http
      .post<SignupResponseData>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/register/local',
        {
          firstName,
          lastName,
          email,
          type,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  login(email: string, password: string) {
    return this.http
      .post<SignupResponseData>(
        'https://storefront-backend-jan-dev-api.vercel.app/api/account/login/local',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Verify account
  verifyAccount(code: string) {
    return this.http
      .post<SignupResponseData>(
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
      .post<SignupResponseData>(
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
  // Password Reset
  passwordReset(email: string) {
    return this.http
      .post<ForgetPasswordResponse>(
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
  newPasswordReset(password: string, confirmPassword: string) {
    return this.http
      .put<ResetPasswordResponse>(
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
  getStores() {
    return this.http
      .get<BusinessStores>(
        'https://storefront-backend-jan-dev-api.vercel.app//api/business/get-stores/${business_id}',
        {}
      )
      .pipe(catchError(this.handleError));
  }

  postProduct(
    name: string,
    price: number,
    quantity: number,
    description: string,
    isActive: boolean,
    category: string,
    images: string
  ): Observable<ProductResponse> {
    return this.getStores().pipe(
      switchMap((storesResponse) => {
        // Assuming storesResponse contains an array of stores
        const store_Id = storesResponse.data?.id; // Change this to the correct path to the id in your response object
        // Construct the URL with the retrieved storeId
        const postUrl =
          'https://storefront-backend-jan-dev-api.vercel.app/api/product/add/${store_id}';
        return this.http.post<ProductResponse>(postUrl, {
          name,
          price,
          quantity,
          description,
          isActive,
          category,
          images,
        });
      }),
      catchError(this.handleError) // Handle errors from both getStores and postProduct
    );
  }

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
