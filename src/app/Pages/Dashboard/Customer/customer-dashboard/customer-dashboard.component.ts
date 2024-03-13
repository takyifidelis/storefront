import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import introJs from 'intro.js';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { APIService } from '../../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss',
})
export class CustomerDashboardComponent implements OnInit {
  screenWidth: number;
  introJS: any;
  constructor(
    public dataService: DataService,
    media: MediaMatcher,
    public router: Router,
    private apiService: APIService,
    private toastr: ToastrService
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit(): void {
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
            },
            {
              element: '#tourStepTwo',
              intro: `<div style="">
            This button will take you to the <strong style="color:blue">SHOP</strong> page, where you can select a store of your choice.
            </div>`,
            },
            {
              element: '#tourStepThree',
              intro: `<div style="">
            Clicking here will take you to the <strong style="color:blue">FAVOURITE PRODUCT</strong> page, where you  can view details of products liked.
            </div>`,
            },
            {
              element: '#tourStepFour',
              intro: `<div style="">
              Clicking here will take you to the <strong style="color:blue">HISTORY</strong> page, where you  can view details of products liked and added to cart.
            </div>`,
            },
            {
              element: '#tourStepFive',
              intro: `<div style="">
            Clicking here will take you to the <strong style="color:blue">PAYMENT OPTION</strong> page, where you can choose and add a payment option.
            </div>`,
            },
            {
              element: '#tourStepSix',
              intro: `<div style="">
          Clicking here will take you to the <strong style="color:blue">ORDER</strong> page, where you  can see all of orders made and also send reviews and rating of products ordered.
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
  }

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
        this.toastr.info(resData.message, 'Success');
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
}
