import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
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
export class CustomerDashboardComponent {
  screenWidth: number;
  constructor(
    public dataService: DataService,
    media: MediaMatcher,
    public router: Router,
    private authService: APIService,
    private toastr: ToastrService
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  logout() {
    this.authService.logout().subscribe(
      (res) => {
        console.log(res);
        this.toastr.info(res.message, 'Success');
        this.router.navigate(['login']);
      },
      (error) => {
        // Optional: Handle error if logout fails.
        console.error('Logout error:', error);
      }
    );
  }
}
