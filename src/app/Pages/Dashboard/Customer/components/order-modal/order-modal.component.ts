import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
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

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTabsModule,
    StarRatingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent {
  postReview: FormGroup;
  error: string | any = null;

  constructor(private authService: AuthService) {
    this.postReview = new FormGroup({
      remarks: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: FormGroupDirective) {
    console.log(form.value);
    const product = '50c9690f-9623-4cf6-bc3f-f73069abdc93';
    const rating = 3;
    const remarks = form.value.remarks;
    const comment = form.value.comment;
    this.authService.reviewProduct(product, rating, remarks, comment).subscribe(
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
