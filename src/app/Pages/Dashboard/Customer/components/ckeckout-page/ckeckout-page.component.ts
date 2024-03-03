import { Component, OnInit } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { IPayPalConfig } from 'ngx-paypal';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';
import { environment } from '../../../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [NgxPayPalModule, FontAwesomeModule, ReactiveFormsModule],
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
  shippingId: string = ''
  items:any = []

  constructor(
    private apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.dataService.cart = JSON.parse(localStorage.getItem('cart')!);
    // console.log(this.dataService.cart);
    this.user = new FormGroup({
      'first-name': new FormControl(null),
      'streetAddress': new FormControl(null),
      'telephone': new FormControl(null),
      'countryCode':  new FormControl(null),
      'city':  new FormControl(null),
      'appartmentNumber':  new FormControl(null)
    })
  }
  getTotalCost() {
    return this.dataService.cart.map((t:any) => t.price).reduce((acc: any, value: any) => acc + value, 0);
  }
  getdata(){
    if (this.dataService.cart.length > 0) {
      // this.cart = JSON.parse(localStorage.getItem('cart')!);
      for (const item of this.dataService.cart) {
          this.items.push({product:item.id ,quantity: 1, variations:[] })
      }
    console.log(this.items);
    } else {
      this.snackBar.open(
        `Your cart is empty, please add products`,
        'Close',
        { duration: 3000 }
      );
      this.router.navigate(['/ecommerce']);
    }
   
  }
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
    if(this.user.valid){
      this.apiService.addShipping(this.dataService.customerId, this.user.value).subscribe((response: any) => {
        console.log('response:', response);
        this.shippingId = response.data.id;
      }, (error) => {
        console.log("Error", error)
      });
      
      this.user.reset();
    }
  }


}

