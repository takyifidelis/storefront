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
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { Response } from '../../../../../interfaces/all-interfaces';

export interface dummyUserInterface {
  id: string;
  checkbox: string;
  name: any;
  store: string;
  categories: string;
}
export interface productInterface {
  name: string;
  price: number;
  id: string;
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
    ReactiveFormsModule,
  ],

  templateUrl: './merchant-discount.component.html',
  styleUrl: './merchant-discount.component.scss',
})
export class MerchantDiscountComponent {
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  merchantDiscountEmpty = false;
  showForm: boolean = false;
  isLoading: boolean = false;
  isPosting: boolean = false;
  addDiscountInit!: FormGroup;
  addDiscount: FormGroup;
  discountNumber!: any;
  showInitialForm!: boolean;
  storeCategories: string[] = [];
  constructor(
    private apiService: APIService,
    public dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
    this.addDiscount = new FormGroup({
      discountName: new FormControl('', Validators.required),
      storeCategory: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
    this.addDiscountInit = new FormGroup({
      discountNameInit: new FormControl('', Validators.required),
      storeCategoryInit: new FormControl('', Validators.required),
      quantityInit: new FormControl('', Validators.required),
      startDateInit: new FormControl('', Validators.required),
      endDateInit: new FormControl('', Validators.required),
    });
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
      id: '',
      checkbox: '1',
      name: '',
      store: '44',
      categories: 'peach',
    },
  ];

  toggleForm() {
    this.showForm = !this.showForm;
  }
  productFormDisplay() {
    this.showInitialForm = !this.showInitialForm;
  }

  ngOnInit() {
    this.merchantDiscountEmpty = true;
    this.dataSource = new MatTableDataSource(this.users);
    this.isLoading = true;
    this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        for (const cat of catResData['data']) {
          this.storeCategories.push(cat.name);
        }
      });

    this.apiService
      .getPromotionForStore(localStorage.getItem('storeId')!)
      .subscribe(
        (promoData: { [key: string]: any }) => {
          this.discountNumber = promoData['data'].length;
          this.isLoading = false;
          if (this.discountNumber > 0) {
            this.merchantDiscountEmpty = false;
          }
          this.dataSource = new MatTableDataSource(promoData['data']);
        },
        (errorMessage) => {}
      );
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  moreVert(e: dummyUserInterface) {
    localStorage.setItem('promoId', e.id);
    this.dialog
      .open(MerchantDiscountCustomizeComponent, {
        data: e,
        width: '590px',
        position: { right: '50px', top: '10%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const name = form.value.discountName;
    const statement = form.value.storeCategory;
    const discount = Number(form.value.quantity);
    const end = new Date(form.value.endDate);
    const start = new Date(form.value.startDate);
    this.isPosting = true;
    console.log(end);
    this.apiService
      .addPromotionToStore(
        end,
        name,
        discount,
        statement,
        start,
        localStorage.getItem('storeId')!
      )
      .subscribe(
        (resData) => {
          this.isPosting = false;
          this.ngOnInit();
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          this.isPosting = false;
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
    form.reset();
  }
  onSubmitInitial(form2: FormGroupDirective) {
    if (!form2.valid) {
      return;
    }
    const name = form2.value.discountNameInit;
    const statement = form2.value.storeCategoryInit;
    const discount = Number(form2.value.quantityInit);
    const end = new Date(form2.value.endDateInit);
    const start = new Date(form2.value.startDateInit);
    this.isPosting = true;
    this.apiService
      .addPromotionToStore(
        end,
        name,
        discount,
        statement,
        start,
        localStorage.getItem('storeId')!
      )
      .subscribe(
        (resData) => {
          this.isPosting = false;
          this.ngOnInit();
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          this.isPosting = false;
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
    form2.reset();
  }
}

@Component({
  selector: 'app-merchant-discount-customize',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl:
    'merchant-discount-customize/merchant-discount-customize.component.html',
  styleUrl:
    'merchant-discount-customize/merchant-discount-customize.component.scss',
})
export class MerchantDiscountCustomizeComponent {
  productDataSource!: MatTableDataSource<productInterface>;
  displayedColumns: string[] = ['name', 'price', 'category', 'inventory'];
  storeCategories: string[] = [];
  numberOfProducts: any;
  discountUpdate: FormGroup;
  isLoading: boolean = false;
  deleteIsLoading: boolean = false;
  users = [
    {
      name: '1',
      price: 1,
      id: '',
    },
  ];
  panelOpenState = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: productInterface,
    private apiService: APIService,
    private toastr: ToastrService
  ) {
    this.discountUpdate = new FormGroup({
      discountName: new FormControl('', Validators.required),
      storeCategory: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        for (const cat of catResData['data']) {
          this.storeCategories.push(cat.name);
        }
        this.isLoading = true;
        this.apiService.getProductUnderPromotion(this.data.id).subscribe(
          (resData: Response) => {
            this.isLoading = false;
            let d: any = [];
            d = resData.data;
            this.numberOfProducts = d.products.length;
            this.productDataSource = new MatTableDataSource(d.products);
          },
          (errorMessage) => {
            this.isLoading = false;
          }
        );
      });
  }
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const name = form.value.discountName;
    const statement = form.value.storeCategory;
    const discount = Number(form.value.quantity);
    const end = new Date(form.value.endDate);
    const start = new Date(form.value.startDate);
    this.isLoading = true;
    this.apiService
      .updatePromotionForStore(
        end,
        name,
        discount,
        statement,
        start,
        localStorage.getItem('promoId')!
      )
      .subscribe(
        (resData: Response) => {
          let d: any = [];
          d = resData.data;
          this.productDataSource = new MatTableDataSource(d);
          this.isLoading = false;
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          this.isLoading = false;
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
    form.reset();
  }
  onDelete() {
    this.deleteIsLoading = true;
    this.apiService
      .deletePromotionForStore(localStorage.getItem('promoId')!)
      .subscribe(
        (resData) => {
          this.deleteIsLoading = false;
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          this.deleteIsLoading = false;
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
  }
  getPromotionProducts(promoId: string) {}
}
