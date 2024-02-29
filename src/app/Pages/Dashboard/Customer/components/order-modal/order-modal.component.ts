import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
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
import { dummyUserInterface } from '../favorite-product/favorite-product.component';

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
    CommonModule
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent implements OnInit {
  postReview: FormGroup;
  error: string | any = null;
  sum = 0;

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: dummyUserInterface
  ) {
    this.postReview = new FormGroup({
      remarks: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
     
    for (const itemPrice of this.data.items) {
      this.sum += itemPrice.price;
    }
  }

  onSubmit(form: FormGroupDirective) {
    console.log(form.value);
    const product = '50c9690f-9623-4cf6-bc3f-f73069abdc93';
    const rating = 3;
    const remarks = form.value.remarks;
    const comment = form.value.comment;
    // this.authService.reviewProduct(product, rating, remarks, comment).subscribe(
    //   (resData:any) => {
    //     console.log(resData);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //   }
    // );

    form.reset();
  }
}
