import {
  AfterViewInit,
  Component,
  ViewChild,
  Inject,
  OnInit,
  ElementRef,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { dummyUserInterface } from '../../../../../interface/dummy-user.model';
import { APIService } from '../../../../../Services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
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
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
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
  orders: any;
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  numOfOrders!: number;
  isLoading: boolean = false;

  users = [
    {
      checkbox: '',
      orderNumber: '',
      store: '',
      status: '',
      date: '',
      price: '',
    },
  ];
  unsorted: any = [];
  sorted: any = [];
  formattedDate!: string | null;
  datepipe: DatePipe = new DatePipe('en-US');
  isAllActive: boolean = false;
  isProcessingActive: boolean = false;
  isShippedActive: boolean = false;
  isDeliveredActive: boolean = false;
  customerOrdersEmpty: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: APIService,
    private elementRef: ElementRef
  ) {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.customerOrdersEmpty = true;
    this.isLoading = true;
    this.apiService
      .getOrders(localStorage.getItem('customerId')!)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.orders = res;
        this.unsorted = this.orders.data;
        this.numOfOrders = this.orders.data.length;
        this.dataSource = new MatTableDataSource(this.orders.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
        if (this.numOfOrders > 0) {
          this.customerOrdersEmpty = false;
        }
      });
    this.isAllActive = true;
  }

  moreVert(e: dummyUserInterface) {
    this.dialog.open(OrderModalComponent, {
      data: e,
      width: '500px',
      position: { right: '50px', top: '10%' },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.unsorted.forEach((order: any) => {
      if (order.status === status) {
        this.sorted.push(order);
        this.dataSource = new MatTableDataSource(this.sorted);
      } else if (status === 'All') {
        this.dataSource = new MatTableDataSource(this.unsorted);
      }
    });
  }
}
