import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { DataService } from '../../../../Services/data.service';

import { MerchantAddProductComponent } from '../components/merchant-add-product/merchant-add-product.component';
import { AuthService } from '../../../Authentication/Auth/auth.service';
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
  ],
  templateUrl: './merchant-dashboard.component.html',
  styleUrl: './merchant-dashboard.component.scss',
})
export class MerchantDashboardComponent {
  constructor(
    public dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
