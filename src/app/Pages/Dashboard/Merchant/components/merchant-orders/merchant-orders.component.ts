import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { APIService } from '../../../../../Services/api.service';
import { dummyUserInterface } from '../merchant-products-dashboad/merchant-products-dashboad.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MerchantOrderModalComponent } from '../merchant-order-modal/merchant-order-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MerchantOrder, SingleOrder } from '../../../../../interfaces/all-interfaces';

@Component({
  selector: 'app-merchant-orders',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './merchant-orders.component.html',
  styleUrl: './merchant-orders.component.scss',
})
export class MerchantOrdersComponent {
  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private apiService: APIService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  displayedColumns: string[] = [
    'checkbox',
    'orderNumber',
    'store',
    'status',
    'date',
    'price',
    'bubble',
  ];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  merchantOrdersEmpty = false;
  users: dummyUserInterface[] = [];
  orders: any = [];
  unsorted: any = [];
  sorted: any = [];
  isLoading: boolean = false;
  formattedDate!: string | null;
  datepipe: DatePipe = new DatePipe('en-US');
  isAllActive = false;
  isProcessingActive = false;
  isShippedActive = false;
  isDeliveredActive = false;
  numOfOrders!: number;

  ngOnInit(): void {
    this.merchantOrdersEmpty = true;
    this.isLoading = true;
    this.apiService
      .getOrdersForMerchant(localStorage.getItem('storeId')!)
      .subscribe((res: MerchantOrder) => {
        this.orders = res.data;
        this.unsorted = this.orders;
        this.isLoading = false;
        this.numOfOrders = res.data.length;
        if (res.data.length > 0) {
          this.merchantOrdersEmpty = false;
        }
        console.log(this.orders);
        this.dataSource = new MatTableDataSource(this.orders);
      });

    this.isAllActive = true;
  }

  moreVert(e: dummyUserInterface) {
    this.dialog
      .open(MerchantOrderModalComponent, {
        data: e,
        width: '479px',
        position: { right: '50px', top: '10%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
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
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: dummyUserInterface): string {
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

  switchTab(tabName: string) {
    this.isAllActive = false;
    this.isProcessingActive = false;
    this.isShippedActive = false;
    this.isDeliveredActive = false;

    // Activate the selected tab
    switch (tabName) {
      case 'All':
        this.isAllActive = true;
        break;
      case 'Processing':
        this.isProcessingActive = true;
        break;
      case 'Shipped':
        this.isShippedActive = true;
        break;
      case 'Delivered':
        this.isDeliveredActive = true;
        break;
      default:
        break;
    }
  }

  onSort(status: string) {
    this.sorted = [];
    this.unsorted.forEach((order: SingleOrder) => {
      if (order.status === status) {
        this.sorted.push(order);
        this.dataSource = new MatTableDataSource(this.sorted);
      } else if (status === 'All') {
        this.dataSource = new MatTableDataSource(this.unsorted);
      }
    });
  }
}
