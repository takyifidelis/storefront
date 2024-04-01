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
  MatDialogActions,
  MatDialogClose,
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
import { Router, RouterModule } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../../../../Services/data.service';
import { merchantProduct } from '../../../../../interfaces/all-interfaces';

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  categories: string;
  inventory: string;
  status: string;
  images: { [key: string]: any }[];
  commission: string;
  currency: string;
  amount: string;
  wallet: string;
  orderPayout: any;
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
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './merchant-products-dashboad.component.html',
  styleUrl: './merchant-products-dashboad.component.scss',
})
export class MerchantProductsDashboadComponent {
  merchantProductsEmpty = false;
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  isLoading: boolean = true;
  numberOfProducts!: number;
  users = [];
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  showSelection(e: any) {
    e.stopPropagation();
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: dummyUserInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.checkbox + 1
    }`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.isLoading = true;
    this.merchantProductsEmpty = true;
    this.apiService
      .getStoreProductsMerchant(localStorage.getItem('storeId')!)
      .subscribe((response: any) => {
        this.isLoading = false;
        this.numberOfProducts = response.data.products.length;
        if (this.numberOfProducts > 0) {
          this.merchantProductsEmpty = false;
        }
        this.users = response.data;
        this.dataSource = new MatTableDataSource(response.data.products);
        this.dataSource.paginator = this.paginator
      });
  }
}

@Component({
  selector: 'app-merchant-product-discount',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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
  isLoading: boolean = false;
  pdata: { products: string[]; categories: string[] } = {
    products: [],
    categories: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: merchantProduct,
    private apiService: APIService,
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router
  ) {
    this.addPromotion = new FormGroup({
      promo: new FormControl('', Validators.required),
    });

    this.apiService
      .getPromotionForStore(localStorage.getItem('storeId')!)
      .subscribe(
        (promoData: { [key: string]: any }) => {
          this.promoData = promoData['data'];
        },
        (errorMessage) => {
        }
      );
  }

  addPromotionToStore(form: FormGroupDirective) {
    this.isLoading = true;
    this.pdata.products.push(this.data.id);
    this.pdata.categories.push(this.data.category);
    this.apiService
      .addProductsToPromotion(form.value.promo.id, this.pdata)
      .subscribe(
        (promoData) => {
          this.isLoading = false;
          this.toastr.info(promoData.message, 'Success');
        },
        (errorMessage) => {
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
  }

  onUpdateProduct() {
    this.dataService.updateProduct = this.data;
    this.dataService.isProductUpdateInstance = true;
    this.router.navigate(['/merchant/product/add-product']);
  }
  onDeleteProduct() {
    let deleteIds: string[] = [];
    deleteIds.push(this.data.id);
    this.isLoading = true;
    this.apiService.deleteProductFromStore(deleteIds).subscribe(
      (deleteResponse) => {
        this.isLoading = false;
        this.toastr.info(deleteResponse.message, 'Success');
      },
      (errorMessage) => {
        this.isLoading = false;
        this.toastr.error(errorMessage.error.message, errorMessage.error.type);
      }
    );
  }
}
