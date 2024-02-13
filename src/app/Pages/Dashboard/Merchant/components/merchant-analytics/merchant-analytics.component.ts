import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-analytics',
  standalone: true,
  imports: [],
  templateUrl: './merchant-analytics.component.html',
  styleUrl: './merchant-analytics.component.scss'
})
export class MerchantAnalyticsComponent {
  constructor(public dataService: DataService) {}
}
