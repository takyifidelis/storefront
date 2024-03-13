import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { DataService } from '../../../../Services/data.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MerchantAddProductComponent } from '../components/merchant-add-product/merchant-add-product.component';
import { APIService } from '../../../../Services/api.service';

import { CommonModule } from '@angular/common';
// import { MerchantAddProductComponent } from '../components/merchant-add-product';
@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MerchantAddProductComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './merchant-dashboard.component.html',
  styleUrl: './merchant-dashboard.component.scss',
})
export class MerchantDashboardComponent implements OnInit {
  stores: {
    [key: string]: any;
  }[] = [];
  constructor(
    public dataService: DataService,
    private apiService: APIService,
    private router: Router
  ) {}
  logout() {
    this.apiService.logout().subscribe(
      (resData) => {
        console.log(resData);
        localStorage.clear();
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
  onSelectedStoreChange(val: MatSelectChange) {
    console.log(val);
    localStorage.setItem('storeId', this.dataService.selectedStore['id']);
    localStorage.setItem(
      'template',
      this.dataService.selectedStore['template'].options
    );
  }
  createNewStore() {
    // localStorage.setItem('temp',this.dataService.selectedStore)
    this.router.navigate(['/merchant-onboarding-1']);
  }
  ngOnInit() {
    this.apiService
      .getMerchantStores(localStorage.getItem('businessId')!)
      .subscribe((resData: { [key: string]: any }) => {
        this.stores = resData['data'];
        console.log(this.stores);
        if (
          this.dataService.selectedStore['id'] &&
          this.dataService.selectedStore['id'].length
        ) {
          // this.dataService.selectedStore = this.dataService.selectedStore
        } else {
          this.dataService.selectedStore = this.stores[0];
        }
        console.log(this.dataService.selectedStore);
        localStorage.setItem('storeId', this.dataService.selectedStore['id']);
        localStorage.setItem(
          'template',
          this.dataService.selectedStore['template'].options
        );
        localStorage.setItem(
          'tempTemplate',
          this.dataService.selectedStore['template'].temp.options
        );
      });
  }
}
