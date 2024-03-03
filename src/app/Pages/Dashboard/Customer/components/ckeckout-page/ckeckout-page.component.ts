import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { IPayPalConfig } from 'ngx-paypal';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';
import { environment } from '../../../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupResponseData } from '../../../../Authentication/Auth/api.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [NgxPayPalModule, FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ckeckout-page.component.html',
  styleUrl: './ckeckout-page.component.scss',
})
export class CkeckoutPageComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  orderId: string | undefined;
  customerId: string | undefined;
  cart: any;
  storeId: string | undefined;
  info = faCircleInfo;
  user!: FormGroup;
  shippingId: string = '';
  payload: any;
  PAYPAL_CLIENT_ID: string =   `${environment.paypalClientID2}`;
  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef | undefined;
  items:any = []


  constructor(
    private apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public http: HttpClient
  ) {}
  getdata(){
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    let items = []
    for (const item of this.cart) {
        items.push({product:item.id ,quantity: item.quant, variations:[] })
    }
    return items;
  }
  
  ngOnInit(): void {
    this.initConfig();
    this.dataService.cart = JSON.parse(localStorage.getItem('cart')!);
    // console.log(this.dataService.cart);
    this.user = new FormGroup({

      name: new FormControl(null, Validators.required),
      streetAddress: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      countryCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      apartmentNo: new FormControl(null, Validators.required),
      

    });
    this.payload = {
      items: this.getdata(),
      shipping: '38839ef8-8d01-47f3-bb50-91dbe5f2f6ce',
      store: 'f9586428-62e3-4455-bb1d-61262a407d1a',
    };

this.createOrder();

    // console.log(this.getdata());

  }
  createOrder() {
    this.apiService.initializePayment(this.payload).subscribe((res: any) =>{
      console.log(res);
      this.orderId = res.data.orderId;
      return  this.orderId;
    });
  }

  async onApprove(data: { orderID: string }) {
    console.log(data);
    alert("paused");
    const response = await fetch(
      `${environment.baseApiUrl}/order/approve-payment/` + data.orderID,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    console.log(response);
    const orderData = await response.json();
    if (orderData.type === 'success') {

//       'first-name': new FormControl(null),
//       'streetAddress': new FormControl(null),
//       'telephone': new FormControl(null),
//       'countryCode':  new FormControl(null),
//       'city':  new FormControl(null),
//       'appartmentNumber':  new FormControl(null)
//     })
//   }
//   getTotalCost() {
//     return this.dataService.cart.map((t:any) => t.price).reduce((acc: any, value: any) => acc + value, 0);
//   }
//   getdata(){
//     if (this.dataService.cart.length > 0) {
//       // this.cart = JSON.parse(localStorage.getItem('cart')!);
//       for (const item of this.dataService.cart) {
//           this.items.push({product:item.id ,quantity: 1, variations:[] })
//       }
//     console.log(this.items);
//     } else {

      this.snackBar.open(
        `Your cart is empty, please add products`,
        'Close',
        { duration: 3000 }
      );
      this.router.navigate(['/ecommerce']);
    }
   
  }


  // private initConfig(): void {
  //   this.payPalConfig = {
  //     clientId: environment.paypalClientID2,
  //     createOrderOnServer: this.createOrder()!,
  //     onApprove: (data: any, actions: any) => {
  //        this.onApprove(data);
  //     },
  //     onClientAuthorization: (data: any) => {
  //       console.log(
  //         'onClientAuthorization - you should probably inform your server about completed transaction at this point',
  //         data
  //       );
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: (err) => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     },
  //   };
  // }

  private initConfig(): void {
    
    this.payPalConfig = {
        clientId: `${environment.paypalClientID2}`,
        // for creating orders (transactions) on server see
        // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
        createOrderOnServer: (data) => fetch(`${environment.baseApiUrl}order/initialize/f739a921-7267-4e02-8222-ceb2b4c352cf`,{
          method: "POST",
          headers: {
                  "Content-Type": "application/json",
                },
    body: JSON.stringify(this.payload),

        }
        
        ).then((res) => res.json())
            .then((order) => order.orderID),
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },

  private initConfig(): void {
    
    this.payPalConfig = {
      clientId: environment.paypalClientID,
      createOrderOnServer: (data:any) => {
        console.log(data)
        return new Promise<string>((resolve, reject) => {
                  // resolve("9JL371110H147321Y");
                  
                  let orderData={
                    store: localStorage.getItem('storeId')!,
                    shipping: "",
                    destination: "",
                    items:this.items
                  }
                  this.apiService.getAllShippingAddresses(localStorage.getItem('customerId')!).subscribe((shippingResponseData:{[key: string]: any;} )=> {
                    console.log(shippingResponseData)
                    console.log(shippingResponseData['type'])
                    if (shippingResponseData['type']==="success") {
                      orderData.shipping = shippingResponseData['data'][0].id
                      console.log(orderData)
                      this.apiService.initializePayment(localStorage.getItem('customerId')!,orderData).subscribe((orderResponseData:{[key: string]: any;}) => {
                        resolve(orderResponseData['data'].orderId)
                      }),(error:HttpErrorResponse) => {
                        console.error('Error creating order:', error);
                        reject(error);
                      }
                    }

                  }),
                  (error:HttpErrorResponse) => {
                    console.error('Error creating order:', error);
                    reject(error);
                  }
              });
      },
      onApprove: (data:any, actions:any) => {
        console.log(data)
        return new Promise<string>((resolve, reject) => {
          this.apiService.onApprovePayment(data.orderID).subscribe((response:{[key: string]: any;}) =>{
            console.log(response)
            if (response['type'] === 'success') {
              this.snackBar.open(
                `Transaction completed for order ${data.orderID}`,
                'Close',
                { duration: 3000 }
              );
            }
            // dispatch(clearCart());
            localStorage.removeItem('cart');
            this.router.navigate(['/customer/orders']);
            
          })
        })
      },
      onClientAuthorization: (data:any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },

    };
}



  onSubmit() {
    console.log(this.user);
    this.http
      .post<SignupResponseData>(
        `${environment.baseApiUrl}/customer/add-shipping-address/f739a921-7267-4e02-8222-ceb2b4c352cf`,
        this.user.value,
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }


}




// function createOrder() {
//   const payload = cart && {
//     items: cart.items.map((item) => ({
//       product: item.id,
//       quantity: item.quantity,
//       variations: item.variations,
//     })),
//     shipping: cart.shipping,
//     store: activeSite?.id,
//     destination: "BO",
//   };
//   return fetch(`${apiBaseUrl}/api/order/initialize/${customerData?.id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   })
//     .then(async (response) => {
//       alert("Paused");
//       const res = await response.json();
//       res.type === "error"
//         ? toast.error(res.error[0].reason)
//         : toast.success(res.message);
//       return res.data.orderId;
//     })
//     .then((order) => {
//       return order;
//     });
// }

// function onApprove(data: { orderID: string }) {
//   return fetch(`${apiBaseUrl}/api/order/approve-payment/` + data.orderID, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       orderID: data.orderID,
//     }),
//   })
//     .then((response) => response.json())
//     .then((orderData) => {
//       orderData.type === "success" &&
//         toast.success(
//           `Transaction completed for order ${orderData.data.orderId}`
//         );
//       dispatch(clearCart());
//       navigate(`/customer/orders`);
//     });
// }

/
