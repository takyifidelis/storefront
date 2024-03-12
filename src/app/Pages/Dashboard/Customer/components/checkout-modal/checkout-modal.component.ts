import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserInterface } from '../../../../../interfaces/all-interfaces';
import { ToastrService } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { APIService } from '../../../../../Services/api.service';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss',
})
export class CheckoutModalComponent {
  AddShipping: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CheckoutModalComponent>,
    private apiService: APIService
  ) {
    this.AddShipping = new FormGroup({
      fullName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      apartment: new FormControl('', Validators.required),
      ccode: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
    });
  }

  selectShipping() {
    localStorage.setItem('shippingId', this.data.id);
    this.dialogRef.close();
  }
  AddShippingAddress(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }

    const name = form.value.fullName;
    const streetAddress = form.value.address;
    const apartmentNo = form.value.apartment;
    const countryCode = form.value.ccode;
    const phone = form.value.phone;
    const city = form.value.city;
    const postalCode = form.value.postalCode;

    console.log(form.value);

    this.apiService
      .addCustomerShippingAddress(
        countryCode,
        postalCode,
        apartmentNo,
        phone,
        name,
        streetAddress,
        city,
        localStorage.getItem('customerId')!
      )
      .subscribe(
        (resData) => {
          console.log(resData);
          this.toastr.info(
            'Customer shipping created successfully.',
            'Success'
          );
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
    form.reset();
  }
}
