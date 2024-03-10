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
  if (!localStorage.getItem('tourCompleted')) {
    this.introJS = introJs();
    this.introJS.setOptions({
      steps: [
        {
          element: '#tourStepZero',
          intro: `<div style="width:30rem; ">Welcome to your dashboard!</div>`,
        },
        {
          element: '#tourStepOne',
          intro: `<div style="">Over here you have access to your menu items!</div>`,
        },
        {
          element: '#tourStepTwo',
          intro: `<div style="">
            This button will take you to the <strong style="color:blue">HOME</strong> page, where you can set up stores, payments, shipping and others
            </div>`
        },
        {
          element: '#tourStepThree',
          intro: `<div style="">
            Clicking here will take you to the <strong style="color:blue">PRODUCT</strong> page, where you  can add new products to your store
            </div>`
        },
        {
          element: '#tourStepFour',
          intro: `<div style="">
          This leads to a pages where you can add or modify <strong style="color:blue">DISCOUNT</strong> to products on your store
            </div>`
        },
        {
          element: '#tourStepFive',
          intro: `<div style="">
            Clicking here will take you to the <strong style="color:blue">REVIEW</strong> page, where you  can manage your customer reviews and reply to them
            </div>`
        },
        {
          element: '#tourStepSix',
          intro: `<div style="">
          Clicking here will take you to the <strong style="color:blue">STORE ORDER</strong> page, where you  can see all of your orders that customers have made on the selected store
            </div>`
        },
        {
          element: '#tourStepSeven',
          intro: `<div style="">
          Click here to go to the <strong style="color:blue">CUSTOMERS'</strong> page, where you  see and manage your customers' information
            </div>`
        },
        {
          element: '#tourStepEight',
          intro: `<div style="">
          Click here to see all <strong style="color:blue">PAYMENTS</strong> recieved from your customers
            </div>`
        },
        {
          element: '#tourStepNine',
          intro: `<div style="">
            To sign out, click on this dropdown menu and continue to logout
            </div>`
        },
      ]
    }).onbeforeexit(function () {
      localStorage.setItem('tourCompleted', 'true');
      return confirm("Are You sure you want to exit?");
    }).start();
    }




  }
}
