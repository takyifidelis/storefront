import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { MerchantAddProductComponent } from '../merchant-add-product/merchant-add-product.component';
import { MerchantProductsDashboadComponent } from '../merchant-products-dashboad/merchant-products-dashboad.component';

@Component({
  selector: 'app-merchant-products',
  standalone: true,
  imports: [MerchantAddProductComponent, MerchantProductsDashboadComponent],
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
