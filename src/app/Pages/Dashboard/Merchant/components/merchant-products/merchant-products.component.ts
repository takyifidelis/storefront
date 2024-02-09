import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-merchant-products',
  standalone: true,
  imports: [],
  templateUrl: './merchant-products.component.html',
  styleUrl: './merchant-products.component.scss'
})
export class MerchantProductsComponent implements OnInit {
  constructor(public dataService: DataService) {}
  ngOnInit(){
    this.dataService.merchantDashboardNoProjects = false
    console.log('this.dataService.merchantDashboardNoProjects')
  }
}
