import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { MerchantAddProductComponent } from '../merchant-add-product/merchant-add-product.component';

@Component({
  selector: 'app-merchant-products',
  standalone: true,
  imports: [MerchantAddProductComponent],
  templateUrl: './merchant-products.component.html',
  styleUrl: './merchant-products.component.scss',
})
export class MerchantProductsComponent implements OnInit {
  constructor(public dataService: DataService) {}
  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = true;
    console.log('this.dataService.merchantDashboardNoProjects');
  }
}
