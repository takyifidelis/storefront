import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-discount',
  standalone: true,
  imports: [],
  templateUrl: './merchant-discount.component.html',
  styleUrl: './merchant-discount.component.scss'
})
export class MerchantDiscountComponent {
  constructor(public dataService: DataService) {}
}
