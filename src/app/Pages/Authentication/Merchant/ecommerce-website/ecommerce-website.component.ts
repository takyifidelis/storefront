import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { HomeEcommerceComponent } from './home-ecommerce/home-ecommerce.component';

@Component({
  selector: 'app-ecommerce-website',
  standalone: true,
  imports: [FontAwesomeModule, HomeEcommerceComponent],
  templateUrl: './ecommerce-website.component.html',
  styleUrl: './ecommerce-website.component.scss'
})
export class EcommerceWebsiteComponent {
  heartIcon = faHeart;
  shoppingCartIcon = faShoppingCart;
  searchIcon = faSearch;
}
