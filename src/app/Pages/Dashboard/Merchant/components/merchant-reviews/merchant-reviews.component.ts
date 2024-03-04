import { Component, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dummyUserInterface } from '../../../Customer/components/favorite-product/favorite-product.component';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../../../../Authentication/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { Observable } from 'rxjs';
import { ReviewResponseData } from '../../../../Authentication/Auth/api.model';
import { APIService } from '../../../../../Services/api.service';

export interface CustomerInterface {
  checkbox: string;
  product: any;
  name: string;

  customer: string;
  rating: string;
}

@Component({
  selector: 'app-merchant-reviews',
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
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './merchant-reviews.component.html',
  styleUrl: './merchant-reviews.component.scss',
})
export class MerchantReviewsComponent {
  reviews$!: Observable<ReviewResponseData>;
  filterIcon = faFilter;
  seaechICon = faSearch;
  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private authService: APIService,
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  displayedColumns: string[] = [
    'checkbox',
    'product',
    'name',
    'customer',
    'rating',
  ];
  dataSource: MatTableDataSource<ReviewResponseData>;
  selection = new SelectionModel<ReviewResponseData>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // creating a dummy user data source for the table
  // users = [
  //   {
  //     checkbox: '1',
  //     product: 'Asher A.',
  //     name: '44',

  //     customer: 'Add me',
  //     rating: 'Rate me',
  //   },
  // ];
  users: any;

  moreVert(e: ReviewResponseData) {
    this.dialog.open(ReviewDetailsComponent, {
      data: e,
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
  // checkboxLabel(row?: CustomerInterface): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.checkbox + 1
  //   }`;
  // }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.authService.getReviews().subscribe((response: any) => {
      console.log(response);
      // this.users = response.data
      this.dataSource = new MatTableDataSource(response.data);
    });
  }
}

// Detail Component
@Component({
  selector: 'app-review-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
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
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: 'review-details/review-details.component.html',
  styleUrl: 'review-details/review-details.component.scss',
})
export class ReviewDetailsComponent {
  replyReview: FormGroup;
  error: string | any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewResponseData,
    private authService: APIService
  ) {
    this.replyReview = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }

    const review = this.data.id;
    const comment = form.value.comment;
    this.authService
      .replyReview(comment, review, localStorage.getItem('storeId')!)
      .subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      );
    form.reset();
  }
}
