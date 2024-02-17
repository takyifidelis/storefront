import { MediaMatcher } from '@angular/cdk/layout';
import {  Component, OnInit,} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    MatProgressBarModule,MatButtonModule,
    MatCardModule,MatIconModule,MatSidenavModule,
    MatMenuModule,RouterModule, FormsModule,CommonModule 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  oneOpened: boolean = false;
  twoOpened: boolean = false;
  threeOpened: boolean = false;
  fourOpened: boolean = false;
  constructor(public dataService: DataService) {}
  toggleOpenClose(key: number): void {
    switch (key) {
      case 1:
        this.oneOpened = !this.oneOpened;
        break;
      case 2:
        this.twoOpened = !this.twoOpened;
        break;
      case 3:
        this.threeOpened = !this.threeOpened;
        break;
      case 4:
        this.fourOpened = !this.fourOpened;
        break;
      
        
        
      default:
        break;
    }
  }
  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = false
  }
}
