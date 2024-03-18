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
import { Payout, UserInterface } from '../../../../../interfaces/all-interfaces';

@Component({
  selector: 'app-merchant-analytics',
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
  templateUrl: './merchant-analytics.component.html',
  styleUrl: './merchant-analytics.component.scss',
})
export class MerchantAnalyticsComponent {
  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private apiService: APIService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }
  merchantPaymentEmpty = false;
  displayedColumns: string[] = [
    'paymentMethod',
    'wallet',
    'orderId',
    'totalCost',
    'commission',
    'recieved',
    'date',
  ];
  dataSource: MatTableDataSource<UserInterface>;
  selection = new SelectionModel<UserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users: UserInterface[] = [];
  formattedDate!: string | null;
  payout: any = [];
  payoutAvailable?: string;
  isLoading: boolean = false;
  numOfPayload!: number;

  ngOnInit(): void {
    this.merchantPaymentEmpty = true;
    this.isLoading = true;
    this.apiService
      .getPayouts(localStorage.getItem('storeId')!)
      .subscribe((res: Payout) => {
        this.payout = res.data;
        this.numOfPayload = res.data.length;

        this.isLoading = false;
        if (this.payout.length > 0) {
          this.merchantPaymentEmpty = false;
        }

        if (this.payout.length > 0) {
          this.payoutAvailable = `${this.payout.length} Payout Available`;
        } else {
          this.payoutAvailable = 'Payout Available';
        }
        this.dataSource = new MatTableDataSource(this.payout);
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
