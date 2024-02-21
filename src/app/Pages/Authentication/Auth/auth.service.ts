import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa-3jhZr9_Lo-kszeB5p-g0jKMLAadJTs',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa-3jhZr9_Lo-kszeB5p-g0jKMLAadJTs',
        {
          email: email,
          password: password,
          returnSecureToken: true,
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
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Incorrect email or password';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email or password';
        break;
    }
    return throwError(errorMessage);
  }
}
