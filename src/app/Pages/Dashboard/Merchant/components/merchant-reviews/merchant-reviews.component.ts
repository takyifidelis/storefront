import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-reviews',
  standalone: true,
  imports: [],
  templateUrl: './merchant-reviews.component.html',
  styleUrl: './merchant-reviews.component.scss'
})
export class MerchantReviewsComponent {
  constructor(public dataService: DataService) {}
}
