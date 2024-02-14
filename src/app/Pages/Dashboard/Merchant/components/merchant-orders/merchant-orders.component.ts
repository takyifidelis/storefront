import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-orders',
  standalone: true,
  imports: [],
  templateUrl: './merchant-orders.component.html',
  styleUrl: './merchant-orders.component.scss'
})
export class MerchantOrdersComponent {
  constructor(public dataService: DataService) {}
}
