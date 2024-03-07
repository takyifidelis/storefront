import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
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
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent implements OnInit {
  postReview: FormGroup;
  error: string | any = null;
  sum = 0;

  //   constructor(
  //     private authService: AuthService,
  //     @Inject(MAT_DIALOG_DATA) public data: dummyUserInterface
  starRating!: number;

  constructor(
    private authService: APIService,
    @Inject(MAT_DIALOG_DATA) public data: { [key: string]: any }
  ) {
    this.postReview = new FormGroup({
      remarks: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      starRating: new FormControl('', Validators.required),
    });
    console.log(data);
  }
  ngOnInit(): void {
    for (const itemPrice of this.data['items']) {
      this.sum += itemPrice.price;
    }
  }

  onSubmit(form: FormGroupDirective) {
    let reviewData = {
      product: this.data['items'][0].id,
      rating: this.starRating,
      remarks: form.value.remarks,
      comment: form.value.comment,
    };
    console.log(reviewData);
    // console.log('rating:' + rating);
    // console.log(comment, remarks);

    this.authService.reviewProduct(reviewData, this.data['orderId']).subscribe(
      (resData: any) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    form.reset();
  }
  // onSetStar($event){}
  onSetStar(value: number) {
    this.starRating = value;
  }
}
