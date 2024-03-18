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
import { ToastrService } from 'ngx-toastr';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StarRatingComponent } from '../../../Customer/components/star-rating/star-rating.component';
// import { dummyUserInterface } from '../../../Customer/components/favorite-product/favorite-product.component';
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
    StarRatingComponent,
  ],
  templateUrl: './merchant-reviews.component.html',
  styleUrl: './merchant-reviews.component.scss',
})
export class MerchantReviewsComponent {
  merchantReviewsEmpty = false;
  reviews$!: Observable<ReviewResponseData>;
  filterIcon = faFilter;
  seaechICon = faSearch;
  isLoading: boolean = false;
  numberOfReviews!: number;
  
  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private authService: APIService
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
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.isLoading = true;
    this.merchantReviewsEmpty = true;
    this.authService.getReviews(localStorage.getItem('storeId')!).subscribe(
      (response: any) => {
        console.log(response);
        this.isLoading = false;
        if (response.data.length > 0) {
          this.merchantReviewsEmpty = false;
        }
        this.numberOfReviews = response.data.length;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
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
    StarRatingComponent,
  ],
  templateUrl: 'review-details/review-details.component.html',
  styleUrl: 'review-details/review-details.component.scss',
})
export class ReviewDetailsComponent {
  replyReview: FormGroup;
  error: string | any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewResponseData,
    private authService: APIService,
    private toastr: ToastrService
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
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
    form.reset();
  }
}
