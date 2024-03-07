import {
  AfterViewInit,
  Component,
  ViewChild,
  Inject,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { dummyUserInterface } from '../../../../../interface/dummy-user.model';
import { APIService } from '../../../../../Services/api.service';
import { DatePipe } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';

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

  //   constructor(public dialog: MatDialog, public apiService: APIService) {

  //       checkbox: '1',
  //       orderNumber: '#1233893',
  //       store: 'shopNest',
  //       status: 'Delievered',
  //       date: '21/09/2023',
  //       price: '$52.00',
  //     },
  //     {
  //       checkbox: '1',
  //       orderNumber: '#1233893',
  //       store: 'shopNest',
  //       status: 'Delievered',
  //       date: '21/09/2023',
  //       price: '$52.00',
  //     },
  //   ];

  constructor(public dialog: MatDialog, private apiService: APIService) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe((res: any) => {
      this.orders = res;
      this.unsorted = this.orders.data;
      console.log(this.orders.data);
      this.dataSource = new MatTableDataSource(this.orders.data);
    });
  }

  moreVert(e: dummyUserInterface) {
    this.dialog.open(OrderModalComponent, {
      data: e,
      width: '500px',
      position: { right: '50px', top: '10%' },
    });
    console.log(e);
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

  onSort(status: string) {
    this.sorted = [];
    this.unsorted.forEach((order: any) => {
      if (order.status === status) {
        this.sorted.push(order);
      }
    });
    this.dataSource = new MatTableDataSource(this.sorted);
  }
  //   ngOnInit(): void {
  //     this.apiService
  //       .getSingleOrder('1233893')
  //       .subscribe((res: { [key: string]: any }) => {
  //         console.log(res);
  //       });

  //   }
}
