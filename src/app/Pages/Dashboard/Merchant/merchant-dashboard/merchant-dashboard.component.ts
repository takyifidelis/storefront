import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { DataService } from '../../../../Services/data.service';
import introJs from 'intro.js';
import { MerchantAddProductComponent } from '../components/merchant-add-product/merchant-add-product.component';
import { AuthService } from '../../../Authentication/Auth/auth.service';
import { APIService } from '../../../../Services/api.service';
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
export class MerchantDashboardComponent implements OnInit {
  introJS: any;
  constructor(
    public dataService: DataService,
    private authService: APIService,
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
  ngOnInit() {
    this.introJS = introJs();
    this.introJS.setOptions({
      steps: [
        {
          element: '#tourStepOne',
          intro: 'This is the first step',
          position:'right',
          introHTML: `
            <div>
              <h3>Step 1: Introduction</h3>
              <p>This is the first step of the tour.</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
            </div>
          `
        },
        {
          element: '#step2',
          intro: 'This is the second step'
        }
      ]
    });
    this.introJS.start();

  }
}
