import { Component } from '@angular/core';
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

@Component({
  selector: 'app-ecommerce-website',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './ecommerce-website.component.html',
  styleUrl: './ecommerce-website.component.scss',
})
export class EcommerceWebsiteComponent {
  heartIcon = faHeart;
  shoppingCartIcon = faShoppingCart;
  searchIcon = faSearch;

  dropDownMenu: HTMLElement | null = null;

  toggleBtnFunction() {
    this.dropDownMenu = document.querySelector('#dropdownMenu');
    if (this.dropDownMenu) {
      this.dropDownMenu.classList.toggle('open');
    }
  }
}
