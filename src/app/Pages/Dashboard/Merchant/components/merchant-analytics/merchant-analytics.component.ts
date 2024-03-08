import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { APIService } from '../../../../../Services/api.service';
import { MerchantOrderModalComponent } from '../merchant-order-modal/merchant-order-modal.component';
import { dummyUserInterface } from '../merchant-products-dashboad/merchant-products-dashboad.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-merchant-analytics',
  standalone: true,
  imports: [ FormsModule,
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
  templateUrl: './merchant-analytics.component.html',
  styleUrl: './merchant-analytics.component.scss'
})
export class MerchantAnalyticsComponent {
  constructor(public dataService: DataService, public dialog: MatDialog, private apiService: APIService) {
    this.dataSource = new MatTableDataSource(this.users);

  }

  displayedColumns: string[] = [
    'paymentMethod',
    'wallet',
    'orderId',
    'totalCost',
    'commission',
    'recieved',
    'date',
  ];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  users: dummyUserInterface[] = [
  ];
  orders: any = []
unsorted: any = [];
sorted: any = [];
  formattedDate!: string | null;
   datepipe: DatePipe = new DatePipe('en-US');
   isAllActive = false;
   isProcessingActive = false;
   isShippedActive = false;
   isDeliveredActive = false;

 
  ngOnInit(): void {
     
  }

  moreVert(e: dummyUserInterface) {
    this.dialog.open(MerchantOrderModalComponent, {
      data: e,
      width: '479px',
      position: { right: '50px', top: '10%' },
    }).afterClosed().subscribe(() => {
      this.ngOnInit()
    })
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



}
