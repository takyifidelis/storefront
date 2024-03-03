import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    CommonModule

  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  stores: any;

  constructor(private apiService:APIService, private router:Router,private dataService:DataService){}

  goToStore(){
    this.router.navigate(['/ecommerce']);
  }

  ngOnInit(): void {
    this.apiService.getStores().subscribe((response: any) => {
      console.log(response.data);
      this.stores = response.data;
    })
  }
}
