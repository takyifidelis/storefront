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



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    MatProgressBarModule,MatButtonModule,
    MatCardModule,MatIconModule,MatSidenavModule,
    MatMenuModule,RouterModule, FormsModule,CommonModule ,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  oneOpened: boolean = false;
  twoOpened: boolean = false;
  threeOpened: boolean = false;
  fourOpened: boolean = false;
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
        }
        break;
      case 2:
        this.twoOpened = !this.twoOpened;
        if (this.twoOpened) {
          this.oneOpened = false;
          this.threeOpened = false;
          this.fourOpened = false;
        }
        break;
      case 3:
        this.threeOpened = !this.threeOpened;
        if (this.threeOpened) {
          this.twoOpened = false;
          this.oneOpened = false;
          this.fourOpened = false;
        }
        break;
      case 4:
        this.fourOpened = !this.fourOpened;
        if (this.fourOpened) {
          this.twoOpened = false;
          this.threeOpened = false;
          this.oneOpened = false;
        }
        break;
      
        
        
      default:
        break;
    }
  }

  editStore(){
    
    console.log(this.dataService.businessId)
    this.apiService.getMerchantStores(this.dataService.businessId).subscribe((data:any) => {
      // console.log(data);
      if (data.data.length) {
        console.log(data.data)
        this.router.navigate(['/template-editor']);
      } else {
        this.router.navigate(['/merchant-onboarding-1']);
      }
    })
  }
  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = false
  }
}
