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

  showForm: boolean = false;
  addDiscount: FormGroup;
  storeCategories: string[] = [];
  constructor(
    private apiService: APIService,
    public dataService: DataService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.addDiscount = new FormGroup({
      discountName: new FormControl('', Validators.required),
      storeCategory: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
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

  // console.log(e);

  // the code below is all for the checkboxes in the table
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);

    // Get categories
    this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        // this.storeCategories = catResData['data']
        for (const cat of catResData['data']) {
          this.storeCategories.push(cat.name);
        }
      });
    // Get Store Promotions
    this.apiService
      .getPromotionForStore(localStorage.getItem('storeId')!)
      .subscribe(
        (promoData: { [key: string]: any }) => {
          console.log(promoData);
          this.dataSource = new MatTableDataSource(promoData['data']);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
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
  // Posting the new Promotion
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const name = form.value.discountName;
    const statement = form.value.storeCategory;
    const discount = Number(form.value.quantity);
    const end = new Date(form.value.endDate);
    const start = new Date(form.value.startDate);
    console.log(form.value.quantity);
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
        (resData: { [key: string]: any }) => {
          console.log(resData);
          this.ngOnInit();
          // this.dataSource = new MatTableDataSource(resData['data']);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    form.reset();
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
  discountUpdate: FormGroup;
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
    private apiService: APIService
  ) {
    console.log(data);

    this.discountUpdate = new FormGroup({
      discountName: new FormControl('', Validators.required),
      storeCategory: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // Get categories
    this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        // this.storeCategories = catResData['data']
        for (const cat of catResData['data']) {
          this.storeCategories.push(cat.name);
        }
        this.apiService.getProductUnderPromotion(this.data.id).subscribe(
          (resData: Response) => {
            console.log(resData.data);
            let d: any = [];
            d = resData.data;
            console.log(d);
            this.productDataSource = new MatTableDataSource(d.products);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        );
      });

    // Get Products under a promotion
    // this.getPromotionProducts(this.data.id);
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
    console.log(form.value.quantity);
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
          console.log(d);
          this.productDataSource = new MatTableDataSource(d);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    form.reset();
  }
  onDelete() {
    this.apiService
      .deletePromotionForStore(localStorage.getItem('promoId')!)
      .subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
  }
  getPromotionProducts(promoId: string) {
    // Get Products under a promotion
    // this.apiService.getProductUnderPromotion(promoId).subscribe(
    //   (resData: Response) => {
    //     console.log(resData.data);
    //     let d: any = [];
    //     d = resData.data;
    //     console.log(d);
    //     this.productDataSource = new MatTableDataSource(d.products);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //   }
    // );
  }

}
