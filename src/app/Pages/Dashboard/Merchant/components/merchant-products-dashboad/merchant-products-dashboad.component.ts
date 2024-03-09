import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { MatTabsModule } from '@angular/material/tabs';

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  categories: string;
  inventory: string;
  status: string;
  images: { [key: string]: any }[];
}
export interface productDetailInterface {
  id: string;
  createdAt: string;
  name: any;
  discount: number;
  category: string;
  statement: string;
  start: string;
  end: string;
  inventory: string;
  status: string;
  images: { [key: string]: any }[];
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
  isLoading: boolean = false;
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

  constructor(public dialog: MatDialog, private apiService: APIService) {
    this.dataSource = new MatTableDataSource();
  }
  moreVert(e: dummyUserInterface) {
    console.log(e);

    this.dialog
      .open(MerchantProductDiscountComponent, {
        data: e,
        width: '479px',
        position: { right: '50px', top: '10%' },
      })
      .afterClosed()
      .subscribe(() => {
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
    this.isLoading = true;
    this.apiService
      .getStoreProductsMerchant(localStorage.getItem('storeId')!)
      .subscribe((response: any) => {
        console.log(response.data);
        this.isLoading = false;
        // console.log(response.data.products[0].images[0].url);
        // this.users = response.data
        this.dataSource = new MatTableDataSource(response.data.products);
      });
  }
}

@Component({
  selector: 'app-merchant-product-discount',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl:
    'merchant-product-discount/merchant-product-discount.component.html',
  styleUrl:
    'merchant-product-discount/merchant-product-discount.component.scss',
})
export class MerchantProductDiscountComponent {
  promoData!: { [key: string]: any }[];
  addPromotion: FormGroup;
  product = '';
  categories = '';
  selectedPromo: any;
  pdata: { products: string[]; categories: string[] } = {
    products: [],
    categories: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: productDetailInterface,
    private apiService: APIService,
    private toastr: ToastrService
  ) {
    this.addPromotion = new FormGroup({
      promo: new FormControl('', Validators.required),
    });

    this.apiService
      .getPromotionForStore(localStorage.getItem('storeId')!)
      .subscribe(
        (promoData: { [key: string]: any }) => {
          this.promoData = promoData['data'];
          console.log(promoData);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
  }
  ngOnInit() {}

  addPromotionToStore(form: FormGroupDirective) {
    this.pdata.products.push(this.data.id);
    this.pdata.categories.push(this.data.category);
    console.log(this.pdata);
    this.apiService
      .addProductsToPromotion(form.value.promo.id, this.pdata)
      .subscribe(
        (promoData) => {
          console.log(promoData);
          this.toastr.info(promoData.message, 'Success');
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

  onDeleteProduct() {
    let deleteIds: string[] = [];
    deleteIds.push(this.data.id);
    console.log({ products: deleteIds });
    this.apiService.deleteProductFromStore(deleteIds).subscribe(
      (deleteResponse) => {
        console.log(deleteResponse);
        this.toastr.info(deleteResponse.message, 'Success');
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.toastr.error(errorMessage.error.message, errorMessage.error.type);
      }
    );
  }
}
