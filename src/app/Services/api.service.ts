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
 
  product =  {
    id: "2f314507-12e7-48a8-820e-1e5442e98008",
    name: "Nike Men's Lunar MVP Pregame",
    description: "sole Material: Rubber, Other Material: Nike Material, Closure Type: Lace-Up",
    isActive: true,
    quantity: 1,
    reStockLevel: 0,
    category: "Sneakers",
    price: 350,
    discount: 0,
    promotion: null,
    deleted: false,
    createdAt: "2024-02-22T12:35:21.144Z",
    updatedAt: "2024-02-22T12:35:21.144Z",
    store: "f9586428-62e3-4455-bb1d-61262a407d1a",
    variations: [
        {
            type: "White/gym Red-Black",
            values: [
                "41", "42", "45"
            ]
        }
    ],
    reviews: [],
    images: [
        {
            id: "9ebb4e4b-f730-4c77-ac6e-c38a83296029",
            url: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708605316728-back-view.jpg"
        },
        {
            id: "283728c7-94f9-4f17-bbf9-215ad6b42ba3",
            url: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708605318074-foot-view.jpg"
        },
        {
            id: "6ee17a5b-f4d4-476b-9f66-2499814f5434",
            url: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708605319603-front-view.jpg"
        },
        {
            id: "e6ee2bce-b3ae-446b-a353-34f29639f56d",
            url: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708605320906-side-view.jpg"
        }
    ]

  }


  getStore(businessId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/business/get-stores/${businessId}`,
    {
      withCredentials: true,
    })
  }

  getProducts(storeId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/product/get-all-products/${storeId}`,
    {
      withCredentials: true,
    })
  }

  getProduct(productId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.baseApiUrl}/product/${productId}`,
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

  getProductTemp(){
    return this.product;
  }


}
