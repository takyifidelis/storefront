import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Authentication/Auth/auth.service';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  categories: string;
  inventory: string;
  status: string;
}

@Component({
  selector: 'app-merchant-products-dashboad',
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
  templateUrl: './merchant-products-dashboad.component.html',
  styleUrl: './merchant-products-dashboad.component.scss',
})
export class MerchantProductsDashboadComponent {
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'store',
    'categories',
    'status',
    'inventory',

    'bubble',
  ];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // creatine a dummy user data source for the table
  users = [
    {
      checkbox: '1',
      name: 'Asher A.',
      store: '44',
      categories: 'peach',
      status: 'status',
      inventory: 'more money',
    },
  ];

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.dataSource = new MatTableDataSource(this.users);
  }
  moreVert(e: dummyUserInterface) {
    this.dialog.open(MerchantProductDiscountComponent, {
      data: {
        itemName: 'hat',
        itemPrice: 'hat',
      },
      width: '479px',
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

  ngOnInit() {
    this.authService.getProducts().subscribe((response: any) => {
      console.log(response.data.products);
      console.log(response.data.products[0].images[0].url);
      // this.users = response.data
      this.dataSource = new MatTableDataSource(response.data.products);
    });
  }
}

@Component({
  selector: 'app-merchant-product-discount',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl:
    'merchant-product-discount/merchant-product-discount.component.html',
  styleUrl:
    'merchant-product-discount/merchant-product-discount.component.scss',
})
export class MerchantProductDiscountComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: dummyUserInterface) {
    console.log('kji');
  }
}
