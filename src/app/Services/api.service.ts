import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {
  CustomerInfo,
  MerchantInfo,
  MerchantOrder,
  Order,
  Payout,
  SavedProducts,
  Shop,
  SingleProductResponseData,
  UserCredentials,
} from '../interfaces/all-interfaces';
import { DataService } from './data.service';

import { Response } from '../interfaces/all-interfaces';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, public dataService: DataService) {}

  merchantSignup(user: UserCredentials): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/account/register/local`,
      user,
      {
        withCredentials: true,
      }
    );
  }
  verifySignup(user: UserCredentials): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/account/verify`,
      user,
      {
        withCredentials: true,
      }
    );
  }
  // Verify account
  verifyAccount(code: string) {
    return this.http.post<Response>(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/verify',
      {
        code,
      },
      {
        withCredentials: true,
      }
    );
  }

  // Password Verification
  verifyPassword(code: string) {
    return this.http.post<Response>(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/password/resetCode/verify',
      {
        code,
      },
      {
        withCredentials: true,
      }
    );
  }
  newPasswordReset(password: string, confirmPassword: string) {
    return this.http.put<Response>(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/password/reset',
      {
        password,
        confirmPassword,
      },
      {
        withCredentials: true,
      }
    );
  }
  authenticateUser(user: UserCredentials): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/account/login/local`,
      user,
      {
        withCredentials: true,
      }
    );
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
    return this.http.get<Response>(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/logout',
      { withCredentials: true }
    );
  }

  createStore(
    businessId: string,
    data: { [key: string]: any }
  ): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/business/create-new-store/${businessId}`,
      data,
      {
        withCredentials: true,
      }
    );
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
    return this.http.get<Response>(
      `${environment.baseApiUrl}/api/store/get-store/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  getSingleStore(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-store/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  getStores(): Observable<Shop> {
    return this.http.get<Shop>(`${environment.baseApiUrl}/store/get-all`, {
      withCredentials: true,
    });
  }

  getStoresForMerchant(businessId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/business/get-stores/${businessId}`,
      {
        withCredentials: true,
      }
    );
  }

  getCustomers(): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-all-customers/f739a921-7267-4e02-8222-ceb2b4c352cf`,
      {
        withCredentials: true,
      }
    );
  }

  getGoogle(): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/account/google/auth`,
      {
        withCredentials: true,
      }
    );
  }

  AddStoreCategories(
    storeId: string,
    categoryName: { [key: string]: string[] }
  ): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/store/add-category/${storeId}`,
      categoryName,
      {
        withCredentials: true,
      }
    );
  }

  getStoreCategories(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-categories/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  orderDelivered(orderId: string): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/order/delivered/${orderId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  getWallet(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-wallets/${storeId}`,
      {
        withCredentials: true,
      }
    );
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

  orderCancelled(order: any): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/order/cancel-orders`,
      order,
      {
        withCredentials: true,
      }
    );
  }

  orderShipped(orderId: string): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/order/shipped/${orderId}`,
      {},

      {
        withCredentials: true,
      }
    );
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

  getStoreProductsCustomer(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-store-products/${storeId}`,
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

  getStoreProducts(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/product/get-all-products/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }
  postProduct(formData: FormData, storeId: string) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/product/add/${storeId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  updateProduct(formData: any, productId: string) {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/product/update-product/${productId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
  // publishTemplate(storeId: string, template:any): Observable<Response>{
  //   return this.http.patch<Response>(`${environment.baseApiUrl}/store/publish-template/${storeId}`,
  //   template, {
  //     withCredentials: true,
  //   })
  // }
  addTOViews(products: any, customerId: string): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/add-to-views/${customerId}`,
      products,
      {
        withCredentials: true,
      }
    );
  }

  getShipping(customerId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/customer/get-shipping-addresses/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }

  getOrders(customerId: string): Observable<Order> {
    return this.http.get<Order>(
      `${environment.baseApiUrl}/customer/get-orders/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }

  addToFavourite(products: any, customerId: string): Observable<Response> {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/add-to-views/${customerId}`,
      products,

      {
        withCredentials: true,
      }
    );
  }

  getSavedProducts(customerId: string): Observable<SavedProducts> {
    return this.http.get<SavedProducts>(
      `${environment.baseApiUrl}/customer/get-saved-products/${customerId}/?idOnly=true&likedOnly=true`,
      {
        withCredentials: true,
      }
    );
  }

  getHistoryProducts(customerId: string): Observable<SavedProducts> {
    return this.http.get<SavedProducts>(
      `${environment.baseApiUrl}/customer/get-saved-products/${customerId}`,
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

  getOneProducts(productId: string): Observable<SingleProductResponseData> {
    return this.http.get<SingleProductResponseData>(
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
    return this.http.post<Response>(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/request/password/reset',
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
  }

  //Resend Verification Code
  resendCode() {
    return this.http.get(
      'https://storefront-backend-jan-dev-api.vercel.app/api/account/resend/code',
      { withCredentials: true }
    );
  }

  reviewProduct(review: { [key: string]: any }, order_id: string) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/review-product/${order_id}`,
      review,
      {
        withCredentials: true,
      }
    );
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
    return this.http.post<Response>(
      `https://storefront-backend-jan-dev-api.vercel.app/api/store/reply-customer/${storeId}`,
      {
        comment,
        review,
      },
      {
        withCredentials: true,
      }
    );
  }

  getReviews(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `https://storefront-backend-jan-dev-api.vercel.app/api/store/get-reviews/${storeId}`,

      { withCredentials: true }
    );
  }

  addPromotionToStore(
    end: Date,
    name: string,
    discount: number,
    statement: string,
    start: Date,
    storeId: string
  ) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/store/add-promotion/${storeId}`,
      {
        end,
        name,
        discount,
        statement,
        start,
      },
      {
        withCredentials: true,
      }
    );
  }
  getPromotionForStore(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-promotions/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }
  updatePromotionForStore(
    end: Date,
    name: string,
    discount: number,
    statement: string,
    start: Date,
    promoId: string
  ) {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/store/update-promotion/${promoId}`,
      {
        name,
        end,
        discount,
        statement,
        start,
      },
      {
        withCredentials: true,
      }
    );
  }
  deletePromotionForStore(promoId: string) {
    return this.http.delete<Response>(
      `${environment.baseApiUrl}/store/delete-promotion/${promoId}`,
      { withCredentials: true }
    );
  }
  addProductsToPromotion(
    promoId: string,
    data: { products: string[]; categories: string[] }
  ) {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/product/add-promotion-products/${promoId}`,
      data,
      { withCredentials: true }
    );
  }
  deleteProductFromStore(products: string[]) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/product/delete`,
      { products },
      {
        withCredentials: true,
      }
    );
  }
  getProductUnderPromotion(promoId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-promotion-products/${promoId}`,
      {
        withCredentials: true,
        // /api/store/get-promotion-products
      }
    );
  }

  getOrdersForMerchant(storeId: string): Observable<MerchantOrder> {
    return this.http.get<MerchantOrder>(
      `${environment.baseApiUrl}/store/get-all-orders/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }
  getCustomerWallet(customerId: string) {
    return this.http.get(
      `${environment.baseApiUrl}/customer/add-wallet/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }
  addWalletCustomer(
    method: string,
    walletId: string,
    name: string,
    secret: string,
    customerId: string
  ) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/add-wallet/${customerId}`,
      { method, walletId, name, secret },
      { withCredentials: true }
    );
  }
  getAllCustomersForStore(storeId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/get-all-customers/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  getOrderHistoryForCustomer(
    storeId: string,
    customerId: string
  ): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/store/${storeId}/get-customer/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }
  getShippingAddressForCustomer(customerId: string): Observable<Response> {
    return this.http.get<Response>(
      `${environment.baseApiUrl}/customer/get-shipping-addresses/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }

  getPayouts(storeId: string): Observable<Payout> {
    return this.http.get<Payout>(
      `${environment.baseApiUrl}/store/get-payouts/${storeId}`,
      {
        withCredentials: true,
      }
    );
  }

  addCustomerShippingAddress(
    countryCode: string,
    postalCode: string,
    apartmentNo: string,
    phone: string,
    name: string,
    streetAddress: string,
    city: string,
    customerId: string
  ) {
    return this.http.post<Response>(
      `${environment.baseApiUrl}/customer/add-shipping-address/${customerId}`,
      {
        countryCode,
        postalCode,
        apartmentNo,
        phone,
        name,
        streetAddress,
        city,
      },
      {
        withCredentials: true,
      }
    );
  }
  removeProductFromFavorite(products: string[], customerId: string) {
    return this.http.patch<Response>(
      `${environment.baseApiUrl}/customer/remove-products-from-favorites/${customerId}`,

      { products },
      {
        withCredentials: true,
      }
    );
  }
  checkAuthenticatedUser() {
    return this.http
      .get<Response>(`${environment.baseApiUrl}/account/auth/user`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getCustomer(customerId: string): Observable<CustomerInfo> {
    return this.http.get<CustomerInfo>(
      `${environment.baseApiUrl}/customer/${customerId}`,
      {
        withCredentials: true,
      }
    );
  }
  getMerchant(businessId: string): Observable<MerchantInfo> {
    return this.http.get<MerchantInfo>(
      `${environment.baseApiUrl}/business/${businessId}`,
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
      case 'VALIDATION_ERROR':
        errorMessage = 'Parameters failed validation';
        break;
    }
    return throwError(errorMessage);
  }
}
