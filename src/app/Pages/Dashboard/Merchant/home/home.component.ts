import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../../../../Services/data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.merchantDashboardNoProjects = true
    console.log('heeeii')
  }
}
