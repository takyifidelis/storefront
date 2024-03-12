import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { APIService } from '../../../../../Services/api.service';
import { HistoryModalComponent } from './history-modal/history-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from '../../../../../interfaces/all-interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
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
    HistoryModalComponent,
    RouterModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'store',
    'categories',
    'price',
    'bubble',
  ];
  dataSource: MatTableDataSource<UserInterface>;
  selection = new SelectionModel<UserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cart: any = [];
  favProducts!: number;
  users: UserInterface[] = [];

  constructor(private apiService: APIService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.apiService
      .getHistoryProducts(localStorage.getItem('customerId')!)
      .subscribe((response: any) => {
        this.cart = response.data;
        this.favProducts = response.data.length;
        this.dataSource = new MatTableDataSource(this.cart);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(response);
      });
  }

  moreVert(e: UserInterface) {
    this.dialog
      .open(HistoryModalComponent, {
        data: e,
        width: '479px',
        position: { right: '50px', top: '10%' },
      })
      .afterClosed()
      .subscribe((resData) => {
        console.log(resData);
        this.ngOnInit();
      });
  }

  // the code below is all for the checkboxes in the table
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
