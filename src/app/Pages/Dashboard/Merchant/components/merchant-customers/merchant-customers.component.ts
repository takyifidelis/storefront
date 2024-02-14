import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-customers',
  standalone: true,
  imports: [],
  templateUrl: './merchant-customers.component.html',
  styleUrl: './merchant-customers.component.scss'
})
export class MerchantCustomersComponent {
  constructor(public dataService: DataService) {}
}
