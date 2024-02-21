import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NewPaymentOptionComponent } from '../new-payment-option/new-payment-option.component';
import { MatDialog } from '@angular/material/dialog';
import { dummyUserInterface } from '../favorite-product/favorite-product.component';

@Component({
  selector: 'app-payment-option',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './payment-option.component.html',
  styleUrl: './payment-option.component.scss'
})
export class PaymentOptionComponent {
  filterIcon = faFilter;
seaechICon = faSearch;
checkIcon = faCheck;
visa = faCcVisa;
masterCard = faCcMastercard;

constructor(public dialog: MatDialog) {
}
moreVert() {
  this.dialog.open(NewPaymentOptionComponent, {
    width: '479px',
  position: {right: '46px',
    top: '176px'}
  });
  
}
}
