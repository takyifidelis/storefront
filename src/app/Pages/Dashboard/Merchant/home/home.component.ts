import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule, MatSidenavModule,MatMenuModule, 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('search')search!: ElementRef;
  screenWidth:number = 800
  constructor(@Inject(DOCUMENT) private window: Document, media: MediaMatcher, public router:Router) {

  }
  
    ngOnInit(){
      // this.window.getElementById('search')!.click() 
      // console.log(this.search);
  }
}
