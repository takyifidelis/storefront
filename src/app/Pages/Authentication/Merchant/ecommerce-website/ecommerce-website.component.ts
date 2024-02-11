import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ecommerce-website',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './ecommerce-website.component.html',
  styleUrl: './ecommerce-website.component.scss'
})
export class EcommerceWebsiteComponent {
  heartIcon = faHeart;
  shoppingCartIcon = faShoppingCart;
  searchIcon = faSearch;
}
