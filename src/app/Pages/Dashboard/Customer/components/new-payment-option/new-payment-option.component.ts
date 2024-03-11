import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-new-payment-option',
  standalone: true,
  imports: [
    MatDialogModule,
    FontAwesomeModule,
    CommonModule,
    MatTabsModule,
    MatRadioModule,
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
}
