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

export interface productInterface {
  name: string;
  price: number;
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
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
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
      data: {
        itemName: 'hat',
        itemPrice: 'hat',
      },
      width: '600px',
      position: { right: '50px', top: '10%' },
    });
    // console.log(e);
  }

  // the code below is all for the checkboxes in the table
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
    this.apiService.getCustomers().subscribe((res: any) => {
      this.customers = res.data;
      console.log(this.customers);
      this.dataSource = new MatTableDataSource([
        {
          checkbox: '',
          name: 'ddjkjff',
          email: 'hello@',
          orders: 'none',
          lastOrder: 'dd',
          bubble: '',
        },
        {
          checkbox: '',
          name: 'ddjkjff',
          email: 'hello@',
          orders: 'none',
          lastOrder: 'dd',
          bubble: '',
        },
      ]);
    });
  }
}

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: 'customer-details/customer-details.component.html',
  styleUrl: 'customer-details/customer-details.component.scss',
})
export class CustomerDetailsComponent {
  productDataSource!: MatTableDataSource<productInterface>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: productInterface) {}
}
