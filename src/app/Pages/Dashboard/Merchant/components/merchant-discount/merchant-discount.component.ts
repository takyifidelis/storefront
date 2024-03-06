import { Component, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  categories: string;
}
@Component({
  selector: 'app-merchant-discount',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './merchant-discount.component.html',
  styleUrl: './merchant-discount.component.scss',
})
export class MerchantDiscountComponent {
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  showForm: boolean = false;
  constructor(public dataService: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  displayedColumns: string[] = [
    'checkbox',
    'name',
    'category',
    'quantity',
    'start',
    'end',
    'bubble',
  ];
  dataSource!: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users = [
    {
      checkbox: '1',
      name: 'Asher A.',
      store: '44',
      categories: 'peach',
    },
  ];

  toggleForm() {
    this.showForm = !this.showForm;
  }

  // console.log(e);

  // the code below is all for the checkboxes in the table
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);
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
  moreVert(e: dummyUserInterface) {
    this.dialog.open(MerchantDiscountCustomizeComponent, {
      data: {
        itemName: 'hat',
        itemPrice: 'hat',
      },
      width: '479px',
      position: { right: '50px', top: '10%' },
    });
  }
}

@Component({
  selector: 'app-merchant-discount-customize',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatTabsModule],
  templateUrl:
    'merchant-discount-customize/merchant-discount-customize.component.html',
  styleUrl:
    'merchant-discount-customize/merchant-discount-customize.component.scss',
})
export class MerchantDiscountCustomizeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: dummyUserInterface) {
    console.log('kji');
  }
}
