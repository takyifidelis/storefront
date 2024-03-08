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

@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [NgxPayPalModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './ckeckout-page.component.html',
  styleUrl: './ckeckout-page.component.scss',
})
export class CkeckoutPageComponent implements OnInit {
getTotalCost() {
throw new Error('Method not implemented.');
}
  public payPalConfig?: IPayPalConfig;
  orderId: string | undefined;
  customerId: string | undefined;
  cart: any;
  storeId: string | undefined;
  info = faCircleInfo;
  user!: FormGroup;
  shippingId: string = ''

  constructor(
    public apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initConfig();

    this.user = new FormGroup({
      'first-name': new FormControl(null),
      'streetAddress': new FormControl(null),
      'telephone': new FormControl(null),
      'countryCode':  new FormControl(null),
      'city':  new FormControl(null),
      'appartmentNumber':  new FormControl(null)
    })
  }

  async createOrder() {
    const payload = this.cart && {
      items: this.cart.items.map((item: any) => ({
        product: item.id,
        quantity: item.quantity,
        variations: item.variations,
      })),
      shipping: this.cart.shipping,
      store: this.storeId,
      destination: 'BO',
    };
    const response = await fetch(
      `${environment.baseApiUrl}/api/order/initialize/${this.customerId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    alert('Paused');
    const res = await response.json();
    if (res.type === 'error') {
      this.snackBar.open(res.error[0].reason, 'Close', { duration: 3000 });
    } else {
      this.snackBar.open(res.message, 'Close', { duration: 3000 });
    }
    const order = await res.data.orderId;
    return order;
  }

  async onApprove(data: { orderID: string }) {
    const response = await fetch(
      `${environment.baseApiUrl}/order/approve-payment/` + '4UJ77761JM560402R',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: '9JL371110H147321Y',
        }),
      }
    );
    const orderData = await response.json();
    console.log(orderData);
    if (orderData.type === 'success') {
      this.snackBar.open(
        `Transaction completed for order ${orderData.data.orderId}`,
        'Close',
        { duration: 3000 }
      );
      
    this.router.navigate(['/customer/orders']);
    }
    // dispatch(clearCart());
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: environment.paypalClientID,
      createOrderOnServer: (data:any) => {
        console.log(data)
        return new Promise<string>((resolve, reject) => {
                  resolve("9JL371110H147321Y");
              });
      },
      onApprove: (data:any, actions:any) => {
        console.log(data)
        return this.onApprove(data);
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

  // initConfig(): void {
  //   this.payPalConfig = {
  //     clientId: environment.paypalClientID,
  //     createOrderOnServer: (data:any) => {
  //       return new Promise<string>((resolve, reject) => {
  //         resolve("03V91106CX760652J");
  //     });
  //     },
  //     onApprove: (data:any, actions:any) => {
  //       return this.onApprove(data);
  //     },
  //     onClientAuthorization: (data:any) => {
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
}

// function
