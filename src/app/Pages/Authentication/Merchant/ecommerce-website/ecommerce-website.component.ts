import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { HomeEcommerceComponent } from './home-ecommerce/home-ecommerce.component';
import { ReviewComponent } from './review/review.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AboutUsComponent } from './about-us/about-us.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../Services/data.service';
import {MatBadgeModule} from '@angular/material/badge';


import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ecommerce-website',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HomeEcommerceComponent,
    ReviewComponent,
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    AboutUsComponent,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatBadgeModule
    DragDropModule,
    CdkDropList, CdkDrag
  ],
  templateUrl: './ecommerce-website.component.html',
  styleUrl: './ecommerce-website.component.scss',
})
export class EcommerceWebsiteComponent {
  heartIcon = faHeart;
  shoppingCartIcon = faShoppingCart;
  searchIcon = faSearch;

  dropDownMenu: HTMLElement | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(public dataservice: DataService) {}

  toggleBtnFunction() {
    this.dropDownMenu = document.querySelector('#dropdownMenu');
    if (this.dropDownMenu) {
      this.dropDownMenu.classList.toggle('open');
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  drop(event: CdkDragDrop<string[]>) {
   if (this.dataservice.isEditable) {
    moveItemInArray(this.dataservice.template.pagesOrder, event.previousIndex, event.currentIndex);
   }
  }
}
