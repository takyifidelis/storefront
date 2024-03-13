import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { APIService } from '../../../../../Services/api.service';

@Component({
  selector: 'app-new-payment-option',
  standalone: true,
  imports: [
    MatDialogModule,
    FontAwesomeModule,
    CommonModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-payment-option.component.html',
  styleUrl: './new-payment-option.component.scss',
})
export class NewPaymentOptionComponent {
  masterCard = faCcMastercard;
  visa = faCcVisa;
  check = faCheck;
  paypal = faCcPaypal;
  active: boolean | undefined;
  addPaypal: FormGroup;

  constructor(private apiService: APIService) {
    this.addPaypal = new FormGroup({
      method: new FormControl('Paypal'),
      walletId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      secret: new FormControl('', Validators.required),
    });
  }
  AddPaypalMethod(form: FormGroupDirective) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const method = form.value.method;
    const walletId = form.value.walletId;
    const name = form.value.name;
    const secret = form.value.secret;
    this.apiService
      .addWalletCustomer(
        method,
        walletId,
        name,
        secret,
        localStorage.getItem('customerId')!
      )
      .subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
  }
}
