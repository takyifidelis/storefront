import {
  AfterViewInit,
  Component,
  ViewChild,
  Inject,
  OnInit,
  ElementRef,
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
} from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { dummyUserInterface } from '../../../../../interface/dummy-user.model';
import { APIService } from '../../../../../Services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
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
    CommonModule
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
  isAllActive: boolean = false;
  isProcessingActive: boolean = false;
  isShippedActive: boolean = false;
  isDeliveredActive: boolean = false;


  constructor(public dialog: MatDialog, private apiService: APIService, private elementRef: ElementRef) {

    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  ngOnInit(): void {
    
    this.apiService.getOrders(localStorage.getItem('customerId')!).subscribe((res: any) =>{
      this.orders = res;
      this.unsorted = this.orders.data;
      this.dataSource = new MatTableDataSource(this.orders.data);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  this.isAllActive = true;
  }

  moreVert(e: dummyUserInterface) {
    this.dialog.open(OrderModalComponent, {
      data: e,
      width: '500px',
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

  onSort(status: string) {
    if(status === "All" ){
      this.isAllActive = true;
      this.isProcessingActive = false;
      this.isShippedActive = false;
      this.isDeliveredActive = false;
    }
    if(status === "Processing"){
      this.isProcessingActive = true;
      this.isAllActive = false;
      this.isShippedActive = false;
      this.isDeliveredActive = false;
    }
    if(status === "Shipped"){
      this.isShippedActive = true;
      this.isAllActive = false;
      this.isProcessingActive = false;
      this.isDeliveredActive = false;
    }
    if(status === "Delivered"){
      this.isDeliveredActive = true;
      this.isAllActive = false;
      this.isProcessingActive = false;
      this.isShippedActive = false;
    }
    this.sorted = [];
    this.unsorted.forEach((order: any) => {
      if (order.status === status) {
        this.sorted.push(order);
        // console.log(this.sorted)
    this.dataSource = new MatTableDataSource(this.sorted);

      }else if (status === 'All'){
this.dataSource = new MatTableDataSource(this.unsorted)
      }

    });
    this.dataSource = new MatTableDataSource(this.sorted);
  }
 
}
