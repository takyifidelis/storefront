import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectionModel } from '@angular/cdk/collections';
import { faFilter, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import { APIService } from '../../../../../Services/api.service';
import {
  MerchantProductDiscountComponent,
  dummyUserInterface,
} from '../merchant-products-dashboad/merchant-products-dashboad.component';
import { dummyUserInterface1 } from '../../../../../interface/dummy-user.model';
import { Response } from '../../../../../interfaces/all-interfaces';

export interface productInterface {
  name: string;
  price: number;
  id: string;
}
export interface orderInterface {
  email: string;
  firstName: number;
  lastName: number;
  lastOrderDate: string;
  orders: string;
  id: string;
}

@Component({
  selector: 'app-merchant-customers',
  standalone: true,
  imports: [
    FontAwesomeModule,
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
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './merchant-customers.component.html',
  styleUrl: './merchant-customers.component.scss',
})
export class MerchantCustomersComponent implements OnInit {
  merchantCustomersEmpty = false;
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'email',
    'orders',
    'lastOrder',
    'bubble',
  ];
  users: any;
  customers: any;
  numberOfCustomer!: number;
  dataSource: MatTableDataSource<dummyUserInterface1>;
  selection = new SelectionModel<dummyUserInterface1>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private apiService: APIService,
    public dataService: DataService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }
  moreVert(e: dummyUserInterface) {
    this.dialog.open(CustomerDetailsComponent, {
      data: e,
      width: '800px',
      position: { right: '50px', top: '10%' },
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  showSelection(e: any) {
    e.stopPropagation();
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: dummyUserInterface1): string {
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

  ngOnInit() {
    this.merchantCustomersEmpty = true;
    this.isLoading = true;
    this.apiService
      .getAllCustomersForStore(localStorage.getItem('storeId')!)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          this.numberOfCustomer = res.data.length;
          if (this.numberOfCustomer > 0) {
            this.merchantCustomersEmpty = false;
          }
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator
        },
        (errorMessage) => {
        }
      );
  }
}

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatTabsModule,
    MatTableModule,
  ],
  templateUrl: 'customer-details/customer-details.component.html',
  styleUrl: 'customer-details/customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  dataSurce!: MatTableDataSource<orderInterface>;
  productDataSource!: MatTableDataSource<orderInterface>;
  displayedColumns: string[] = ['name', 'price', 'date', 'orders'];
  users: any;
  numOfCustomers!: number;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: orderInterface,
    private apiService: APIService
  ) {
  }
  ngOnInit() {
    this.isLoading = true;
    this.apiService
      .getOrderHistoryForCustomer(
        localStorage.getItem('storeId') ||
          'f9586428-62e3-4455-bb1d-61262a407d1a',
        this.data.id
      )
      .subscribe((res: Response) => {
        this.users = res['data'];
        this.isLoading = false;
        this.numOfCustomers = this.users.length;
        this.dataSurce = new MatTableDataSource(this.users.orders);
      });
  }
}
