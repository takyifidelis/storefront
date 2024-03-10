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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupResponseData } from '../../../../Authentication/Auth/api.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from '../../../../../interfaces/all-interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import e from 'express';
import { dummyUserInterface } from '../../../Merchant/components/merchant-products-dashboad/merchant-products-dashboad.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [NgxPayPalModule, FontAwesomeModule, ReactiveFormsModule,  FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule],
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
  items:any = [];
  displayedColumns: string[] = [
    'name',
    'phone',
    'streetAddress',
    'countryCode',
    'apartmentNo',
    'city', 
  ];
  dataSource: MatTableDataSource<UserInterface>;
  selection = new SelectionModel<UserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users: UserInterface[] = [];
  addShipping: boolean = false;

  constructor(
    private apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public http: HttpClient,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.users);

  }


  
  ngOnInit(): void {
    this.initConfig();
    this.dataService.cart = JSON.parse(localStorage.getItem('cart')!);
    this.user = new FormGroup({

      name: new FormControl(null, Validators.required),
      streetAddress: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      countryCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      apartmentNo: new FormControl(null, Validators.required),
      

    });

    this.cart = JSON.parse(localStorage.getItem('cart')!);
    this.items = [];
    for (const item of this.cart) {
        this.items.push({product:item.id, quantity: item.quant, variations:[] })
    }

    this.payload = {
      items: this.items,
      shipping: '38839ef8-8d01-47f3-bb50-91dbe5f2f6ce',
      store: localStorage.getItem('storeId'),
    };

    this.apiService.getShipping(localStorage.getItem('customerId')!).subscribe((res: any) => {
      console.log(res)
    })
  }

  createOrder() {
    this.apiService.initializePayment(localStorage.getItem('customerId')!,this.payload).subscribe((res: any) =>{
      console.log(res);
      this.orderId = res.data.orderId;
      return  this.orderId;
    });
  }


  getTotalCost() {
    return this.dataService.cart.map((t:any) => t.price).reduce((acc: any, value: any) => acc + value, 0);
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
      localStorage.removeItem('cart');
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  showSelection(e: any) {
    e.stopPropagation();
    console.log(this.selection.selected);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      console.log(this.selection.selected);
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.checkbox + 1
    }`;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

