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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MerchantAddProductComponent } from '../components/merchant-add-product/merchant-add-product.component';
import { APIService } from '../../../../Services/api.service';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  MerchantInfo,
  merchantProduct,
} from '../../../../interfaces/all-interfaces';
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
  introJS: any;
  firstInitial!: string;
  stores: {
    [key: string]: any;
  }[] = [];
  nameInitial!: string;
  user!: any;
  userName!: string;
  constructor(
    public dataService: DataService,
    private apiService: APIService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  logout() {
    let tourCompleted: boolean;
    let editorTourCompleted: boolean;
    if (localStorage.getItem('tourCompleted')) {
      tourCompleted = true;
      if (localStorage.getItem('editorTourCompleted')) {
        editorTourCompleted = true;
      }
    }

    this.apiService.logout().subscribe(
      (resData) => {
        console.log(tourCompleted);
        console.log(editorTourCompleted);
        localStorage.clear();

        if (tourCompleted) {
          localStorage.setItem('tourCompleted', tourCompleted.toString());
          if (editorTourCompleted) {
            localStorage.setItem(
              'tourCompleted',
              editorTourCompleted.toString()
            );
          }
        }

        this.router.navigate(['login']);
        this.toastr.info(resData.message, 'Success');
      },
      (error) => {
        console.error('Logout error:', error);
        if (
          error.message === 'You are not authorized to access this resource.'
        ) {
          this.router.navigate(['login']);
        }
      }
    );
  }
  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = true;
    this.dataService.isLoading = true;
    localStorage.setItem('isInEditMode', 'true');
    this.apiService
      .getMerchantStores(localStorage.getItem('businessId')!)
      .subscribe((resData: { [key: string]: any }) => {
        this.stores = resData['data'];
        this.dataService.isLoading = false;
        if (this.dataService.selectedStore['id']?.length) {
          console.log('not from login', this.dataService.selectedStore);
          resData['data'].array.forEach((element: { [key: string]: any }) => {
            if (element['id'] === this.dataService.selectedStore['id']) {
              localStorage.setItem('storeId', element['id']);
              localStorage.setItem('storeName', element['storeName']);
              localStorage.setItem('template', element['template'].options);
              localStorage.setItem('tempTemplate', element['template'].temp.options);
              // this.dataService.selectedStore = 
            }
          });
        }
        if (resData['data'].length === 0) {
        } else {
          this.dataService.isLoading = false;
          this.dataService.selectedStore = this.stores[0];
          console.log('from login', this.dataService.selectedStore);
          localStorage.setItem('storeId', this.dataService.selectedStore['id']);
          localStorage.setItem(
            'storeName',
            this.dataService.selectedStore['storeName']
          );
          localStorage.setItem(
            'template',
            this.dataService.selectedStore['template'].options
          );
          localStorage.setItem(
            'tempTemplate',
            this.dataService.selectedStore['template'].temp.options
          );
        }
        if (!localStorage.getItem('tourCompleted')) {
          this.introJS = introJs();
          this.introJS
            .setOptions({
              steps: [
                {
                  element: '#tourStepZero',
                  intro: `<div style="width:30rem; ">Welcome to your dashboard!</div>`,
                },
                {
                  element: '#tourStepOne',
                  intro: `<div style="">Over here you have access to your menu items!</div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepTwo',
                  intro: `<div style="">
                This button will take you to the <strong style="color:blue">HOME</strong> page, where you can set up stores, payments, shipping and others
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepThree',
                  intro: `<div style="">
                Clicking here will take you to the <strong style="color:blue">PRODUCT</strong> page, where you  can add new products to your store
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepFour',
                  intro: `<div style="">
              This leads to a pages where you can add or modify <strong style="color:blue">DISCOUNT</strong> to products on your store
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepFive',
                  intro: `<div style="">
                Clicking here will take you to the <strong style="color:blue">REVIEW</strong> page, where you  can manage your customer reviews and reply to them
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepSix',
                  intro: `<div style="">
              Clicking here will take you to the <strong style="color:blue">STORE ORDER</strong> page, where you  can see all of your orders that customers have made on the selected store
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepSeven',
                  intro: `<div style="">
              Click here to go to the <strong style="color:blue">CUSTOMERS'</strong> page, where you  see and manage your customers' information
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepEight',
                  intro: `<div style="">
              Click here to see all <strong style="color:blue">PAYMENTS</strong> recieved from your customers
                </div>`,
                  position: 'right',
                },
                {
                  element: '#tourStepNine',
                  intro: `<div style="">
                To sign out, click on this dropdown menu and continue to logout
                </div>`,
                },
              ],
            })
            .onbeforeexit(function () {
              localStorage.setItem('tourCompleted', 'true');
              return confirm('Are You sure you want to exit?');
            })
            .start();
        }
      });

    this.apiService
      .getMerchant(localStorage.getItem('businessId')!)
      .subscribe((resData: MerchantInfo) => {
        this.user = resData.data;
        this.firstInitial = resData.data.businessName.charAt(0);
        this.nameInitial=resData.data.businessName.match(/\b\w/g)?.join('')|| 'E'
        this.dataService.merchantUserNameInitials = this.nameInitial;
        this.userName = resData.data.businessName;
        this.dataService.merchantUserName = this.userName;
        console.log(this.userName);
      });
  }

  onSelectedStoreChange(val: any) {
    localStorage.setItem('storeId', val.id);
    localStorage.setItem('template', val.template.options);
    localStorage.setItem('tempTemplate', val.template.temp.options);
    let currentRoute = this.router.url
    this.router.navigateByUrl('/merchant', {skipLocationChange:true}).then(() =>{
      this.router.navigate([currentRoute]);
    })
  }
  createNewStore() {
    this.router.navigate(['/merchant-onboarding-1']);
  }
}
