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
    this.router.navigate(['/ecommerce']);
  }

  ngOnInit() {
    
  }
}
