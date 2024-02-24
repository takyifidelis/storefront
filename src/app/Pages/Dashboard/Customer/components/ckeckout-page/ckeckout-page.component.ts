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

@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [NgxPayPalModule, FontAwesomeModule],
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

  constructor(
    public apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.apiService
      .authenticateUser({ email: '', password: '' })
      .subscribe((response: any) => {
          this.customerId = response.data.id;
      });

    this.apiService.getStores().subscribe((response: any) => {
      if(this.storeId)
      {this.storeId = response.data.id;}
    });
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
      `${environment.baseApiUrl}/api/order/approve-payment/` + data.orderID,
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
      clientId: environment.paypalClientID,
      createOrderOnServer: (data) => {
        return this.createOrder();
      },
      onApprove: (data, actions) => {
        return this.onApprove(data);
      },
      onClientAuthorization: (data) => {
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
}

// function
