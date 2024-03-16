import {
  AfterViewInit,
  Component,
  ViewChild,
  Inject,
  OnInit,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { APIService } from '../../../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../../../interfaces/all-interfaces';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite-product',
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
  templateUrl: './favorite-product.component.html',
  styleUrl: './favorite-product.component.scss',
})
export class FavoriteProductComponent implements OnInit {
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
  likedProduct: any;
  products: any;
  users: UserInterface[] = [];
  numOfFavoriteProducts!: number;
  isOneProduct!: boolean;
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  isLoading: boolean = false;
  customerFavoriteEmpty: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: APIService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customerFavoriteEmpty = true;
    this.apiService
      .getSavedProducts(localStorage.getItem('customerId')!)
      .subscribe((res: any) => {
        this.products = res.data;
        console.log(res.data);
        this.isLoading = false;
        this.numOfFavoriteProducts = res.data.length;
        if (this.numOfFavoriteProducts === 1) {
          this.isOneProduct = true;
        } else {
          this.isOneProduct = true;
        }
        if (this.numOfFavoriteProducts > 0) {
          this.customerFavoriteEmpty = false;
        }
        this.isOneProduct;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  moreVert(e: UserInterface) {
    this.dialog.open(PurchaseDetailComponent, {
      data: e,
      width: '479px',
      position: { right: '50px', top: '10%' },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

@Component({
  selector: 'purchase-detail',
  templateUrl: 'purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatIconModule, CommonModule],
})
export class PurchaseDetailComponent {
  isDeleting: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private apiService: APIService,
    private toastr: ToastrService
  ) {
    // console.log(this.data);
  }

  onDeleteProduct() {
    let deleteIds: string[] = [];
    deleteIds.push(this.data.id);
    console.log({ products: deleteIds });
    this.apiService
      .removeProductFromFavorite(deleteIds, localStorage.getItem('customerId')!)
      .subscribe(
        (deleteResponse) => {
          console.log(deleteResponse);
          this.toastr.info(deleteResponse.message, 'Success');
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
  }
}
