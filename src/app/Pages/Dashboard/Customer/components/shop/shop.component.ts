import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../../../../Services/api.service';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    

  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private apiService:APIService, private router:Router,private dataService:DataService){}
  goToStore(){
    this.apiService.getStore(this.dataService.businessId).subscribe((storeResData:any) =>{
      console.log({storeId: storeResData});
      this.dataService.storeId = storeResData.data[0].id
      this.apiService.getStoreProducts(this.dataService.storeId).subscribe((productResData:any)=>{
        this.dataService.products = productResData.data
        if (this.dataService.products) {
          this.router.navigate(['/ecommerce']);
        }
      })
    })
    
  }

  ngOnInit() {
    
  }
}
