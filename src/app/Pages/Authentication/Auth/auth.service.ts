import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface SignupResponseData {
  code: string;
  message: string;
  type: string;
  data?: {
    id: string;
    businessName: string;
    email: string;
    type: string;
    verified: boolean;
    isActive: boolean;
    mustChangePassword: boolean;
    canResetPassword: boolean;
    createdAt: string;
    updatedAt: string;
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

  signup(
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
        }
      )
      .pipe(catchError(this.handleError));
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
    }
    return throwError(errorMessage);
  }
}
