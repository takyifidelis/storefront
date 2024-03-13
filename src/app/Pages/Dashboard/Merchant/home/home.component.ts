import { MediaMatcher } from '@angular/cdk/layout';
import {  Component, OnInit,} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {  Router, RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../../Services/api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    MatProgressBarModule,MatButtonModule,
    MatCardModule,MatIconModule,MatSidenavModule,
    MatMenuModule,RouterModule, FormsModule,CommonModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  oneOpened: boolean = false;
  twoOpened: boolean = false;
  threeOpened: boolean = false;
  fourOpened: boolean = false;
  fiveOpened: boolean = false;
  isActive:boolean = false
  constructor(public dataService: DataService, private router:Router,private apiService:APIService) {}
  toggleOpenClose(key: number): void {
    switch (key) {
      case 1:
        this.oneOpened = !this.oneOpened;
        if (this.oneOpened) {
          this.twoOpened = false;
          this.threeOpened = false;
          this.fourOpened = false;
          this.fiveOpened = false;
        }
        break;
      case 2:
        this.twoOpened = !this.twoOpened;
        if (this.twoOpened) {
          this.oneOpened = false;
          this.threeOpened = false;
          this.fourOpened = false;
          this.fiveOpened = false;
        }
        break;
      case 3:
        this.threeOpened = !this.threeOpened;
        if (this.threeOpened) {
          this.twoOpened = false;
          this.oneOpened = false;
          this.fourOpened = false;
          this.fiveOpened = false;
        }
        break;
      case 4:
        this.fourOpened = !this.fourOpened;
        if (this.fourOpened) {
          this.twoOpened = false;
          this.threeOpened = false;
          this.oneOpened = false;
          this.fiveOpened = false;
        }
        break;
      
        
      case 5:
        this.fiveOpened = !this.fiveOpened;
        if (this.fiveOpened) {
          this.twoOpened = false;
          this.threeOpened = false;
          this.oneOpened = false;
          this.fourOpened = false;
        }
    
        break;
        
      default:
        break;
    }
  }

  editStore(){
    this.dataService.isLoading =true
    this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe((data:any) => {
      console.log(data)
      this.dataService.isInEditMode = true 
      if (data.data.length>0) {
        localStorage.setItem('storeId',data.data[0].id)
        localStorage.setItem('tempTemplate',data.data[0].template.temp.options)
        localStorage.setItem('template',data.data[0].template.options)
        this.dataService.template = JSON.parse(localStorage.getItem('tempTemplate')!)
        this.router.navigate(['/template-editor']);
        this.dataService.isLoading =false
      } else {
        this.router.navigate(['/merchant-onboarding-1']);
        this.dataService.isLoading =false
      }
    })
  }
  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = false
    this.dataService.isInEditMode = false
  }
}