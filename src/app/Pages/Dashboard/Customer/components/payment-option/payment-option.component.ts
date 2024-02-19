import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

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
}
