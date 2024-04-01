import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../Authentication/Auth/auth.service';
import { APIService } from '../../../../../Services/api.service';
import { dummyUserInterface } from '../../../../../interface/dummy-user.model';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTabsModule,
    StarRatingComponent,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatRadioModule,
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent implements OnInit {
  postReview: FormGroup;
  error: string | any = null;
  sum = 0;
  isLoading: boolean = false;
  starRating!: number;

  constructor(
    private authService: APIService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { [key: string]: any }
  ) {
    this.postReview = new FormGroup({
      product: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      starRating: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    for (const itemPrice of this.data['items']) {
      this.sum += itemPrice.price;
    }
  }

  onSubmit(form: FormGroupDirective) {
    let reviewData = {
      product: form.value.product,
      rating: this.starRating,
      remarks: form.value.remarks,
      comment: form.value.comment,
    };
    console.log(reviewData);
    this.isLoading = true;
    this.authService.reviewProduct(reviewData, this.data['id']).subscribe(
      (resData: any) => {
        console.log(resData);
        this.isLoading = false;
        this.toastr.info(resData.message, 'Success');
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.toastr.error(errorMessage.error.message, 'Failed');
      }
    );

    form.reset();
  }
  onSetStar(value: number) {
    this.starRating = value;
  }
}
