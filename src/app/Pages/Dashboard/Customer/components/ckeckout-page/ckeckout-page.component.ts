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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupResponseData } from '../../../../Authentication/Auth/api.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
 

  constructor(
    public apiService: APIService,
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

    console.log(this.getdata());
    this.createOrder()

  }
  createOrder() {
    this.apiService.initializePayment(this.payload).subscribe((res: any) =>{
      console.log(res);
      this.orderId = res.data.orderId;
      return  this.orderId;
    });
  }

  async onApprove(data: { orderID: string }) {
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
    const orderData = await response.json();
    if (orderData.type === 'success') {
      this.snackBar.open(
        `Transaction completed for order ${orderData.data.orderId}`,
        'Close',
        { duration: 3000 }
      );
    }
    // dispatch(clearCart());
    this.router.navigate(['/customer/orders']);
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: environment.paypalClientID2,
      createOrderOnServer: this.createOrder()!,
      onApprove: (data: any, actions: any) => {
         this.onApprove(data);
      },
      onClientAuthorization: (data: any) => {
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

// function
