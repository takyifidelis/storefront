import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    CommonModule,
    FormsModule

  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  stores: any = [];
  searchShop: string = '';
  filteredItems: any = [];

  constructor(private apiService:APIService, private router:Router,private dataService:DataService){}

  goToStore(store:any){
    console.log(store)
    this.dataService.template = JSON.parse(store.template.options)
    localStorage.setItem('storeId',store.id)
    console.log(this.dataService.template)
    this.router.navigate(['/ecommerce']);
  }

  ngOnInit(): void {
    this.apiService.getStores().subscribe((response: any) => {
      this.stores = response.data;
    });

    this.filterItems();
  }

  filterItems(): void {
    this.apiService.getStores().subscribe((response: any) => {
      this.stores = response.data;

      if(this.searchShop === ''){
        this.filteredItems = this.stores;
      }else {
        this.filteredItems = this.stores.filter((shop: any) => {
          return shop.storeName.toLowerCase().includes(this.searchShop.toLowerCase())
        });
      }
    })
    }
}
