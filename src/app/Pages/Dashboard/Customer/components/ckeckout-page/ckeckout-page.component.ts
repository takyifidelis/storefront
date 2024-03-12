import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { IPayPalConfig } from 'ngx-paypal';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';
import { environment } from '../../../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  faCircleInfo,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
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
import {
  SavedProducts,
  UserInterface,
} from '../../../../../interfaces/all-interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckoutModalComponent } from '../checkout-modal/checkout-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ckeckout-page',
  standalone: true,
  imports: [
    NgxPayPalModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
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
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './ckeckout-page.component.html',
  styleUrl: './ckeckout-page.component.scss',
})
export class CkeckoutPageComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  orderId: string | undefined;
  customerId: string | undefined;
  cart: any = [];
  storeId: string | undefined;
  info = faCircleInfo;
  user!: FormGroup;
  isDeleting: boolean = false;
  selectedAddressControl = new FormControl();
  selectedAddress!: { [key: string]: string };

  payload: any;
  shippingSelect!: { [key: string]: string }[];
  PAYPAL_CLIENT_ID: string = `${environment.paypalClientID2}`;
  @ViewChild('paypalRef', { static: true }) private paypalRef:
    | ElementRef
    | undefined;
  items: any = [];
  displayedColumns: string[] = [
    'name',
    'phone',
    'streetAddress',
    'countryCode',
    'apartmentNo',
    'city',
    'bubble',
  ];
  dataSource: MatTableDataSource<UserInterface>;
  selection = new SelectionModel<UserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users: UserInterface[] = [];
  addShipping: boolean = false;
  plus = faPlus;
  minus = faMinus;
  iniitialPrice?: number;
  quantity: any;
  price: any;
  cartProduct!: SavedProducts;
  cartQuantity!: number;
  sum: number = 0;

  constructor(
    private apiService: APIService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.initConfig();
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    console.log(this.cart);
    this.cartQuantity = this.cart.length;
    console.log(this.sum);
    //this.cart = JSON.parse(localStorage.getItem('cart')!);
    this.apiService
      .getShipping(localStorage.getItem('customerId')!)
      .subscribe((res: any) => {
        console.log(res.data);
        this.shippingSelect = res.data;
        console.log(this.shippingSelect);
        this.selectedAddress = this.shippingSelect[0];
      });
    this.apiService
      .getSavedProducts(localStorage.getItem('customerId')!)
      .subscribe(
        (productData) => {
          console.log(productData.data[0].id);

          this.cartProduct = productData;

          this.items = [];
          for (const item of this.cart) {
            this.items.push({
              product: item.id,
              quantity: item.quant,
              variations: [],
            });
          }
          console.log(this.items);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );

    this.payload = {
      items: this.items,
      shipping: this.selectedAddressControl.value.id,
      store: localStorage.getItem('storeId'),
    };
  }

  createOrder() {
    this.apiService
      .initializePayment(localStorage.getItem('customerId')!, this.payload)
      .subscribe((res: any) => {
        console.log(res);
        this.orderId = res.data.orderId;
        return this.orderId;
      });
  }

  // increment() {
  //   for (const item of this.cart) {
  //     this.quantity = item.quant++;
  //     item.price = this.quantity * this.iniitialPrice!;
  //     this.price = item.price;
  //     this.items.push({
  //       product: item.id,
  //       quantity: this.quantity,
  //       variations: [],
  //     });
  // }
  getTotalCost() {
    let sum = 0;
    this.cart.forEach((product: any) => {
      const productCost =
        (product.price / product.quant) *
        ((100 - product.discount) / 100) *
        product.quant;

      sum += productCost;
    });

    return sum;
  }

  async onApprove(data: { orderID: string }) {
    console.log(data);
    alert('paused');
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
      this.snackBar.open(`Your cart is empty, please add products`, 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/ecommerce']);
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: environment.paypalClientID,
      createOrderOnServer: (data: any) => {
        console.log(data);
        return new Promise<string>((resolve, reject) => {
          // resolve("9JL371110H147321Y");

          let orderData = {
            store: localStorage.getItem('storeId')!,
            shipping: '',
            destination: '',
            items: this.items,
          };
          this.apiService
            .getAllShippingAddresses(localStorage.getItem('customerId')!)
            .subscribe((shippingResponseData: { [key: string]: any }) => {
              console.log(shippingResponseData);
              console.log(shippingResponseData['type']);
              if (shippingResponseData['type'] === 'success') {
                orderData.shipping = shippingResponseData['data'][0].id;
                console.log(orderData);
                this.apiService
                  .initializePayment(
                    localStorage.getItem('customerId')!,
                    orderData
                  )
                  .subscribe((orderResponseData: { [key: string]: any }) => {
                    resolve(orderResponseData['data'].orderId);
                  }),
                  (error: HttpErrorResponse) => {
                    console.error('Error creating order:', error);
                    reject(error);
                  };
              }
            }),
            (error: HttpErrorResponse) => {
              console.error('Error creating order:', error);
              reject(error);
            };
        });
      },
      onApprove: (data: any, actions: any) => {
        console.log(data);
        return new Promise<string>((resolve, reject) => {
          this.apiService
            .onApprovePayment(data.orderID)
            .subscribe((response: { [key: string]: any }) => {
              console.log(response);
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
            });
        });
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

  moreVert() {
    this.dialog.open(CheckoutModalComponent, {
      width: '500px',
    });
  }
  onDeleteProduct(productId: string, id: number) {
    let deleteIds: string[] = [];
    console.log(id);
    deleteIds.push(productId);
    console.log({ products: deleteIds });
    this.isDeleting = true;
    this.apiService
      .removeProductFromFavorite(deleteIds, localStorage.getItem('customerId')!)
      .subscribe(
        (deleteResponse) => {
          console.log(deleteResponse);
          this.isDeleting = false;
          this.toastr.info(deleteResponse.message, 'Success');
        },
        (errorMessage) => {
          this.isDeleting = false;
          console.log(errorMessage);
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
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
