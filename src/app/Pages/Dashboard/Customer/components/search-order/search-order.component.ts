import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-search-order',
  standalone: true,
  imports: [FontAwesomeModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatPaginator, MatPaginatorModule,MatTableModule],
  templateUrl: './search-order.component.html',
  styleUrl: './search-order.component.scss'
})
export class SearchOrderComponent implements AfterViewInit {
searchIcon = faSearch;
displayedColumns: string[] = ['order-number', 'order-date', 'order-status', 'total-value', 'payment-method', 'payment-status', 'p-number'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  orderNumber: string;
  orderDate: any;
  orderStatus: string;
  totalValue: any;
  paymentMethod: string;
  paymentStatus: string;
  p_number: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {orderNumber: '18480-11', orderDate: '04/24/22', orderStatus: 'Delivered', totalValue: '$129.87', paymentMethod: 'Payment on Delivery', paymentStatus: 'Paid', p_number: '3050'},
]