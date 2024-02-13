import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [RouterModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule, MatSidenavModule,MatMenuModule, FontAwesomeModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  heartIcon = faHeart;
  starIcon = faStar;
    quantity = 1;
  
  
    increaseQuantity(): void {
      this.quantity++;
    }
  
    decreaseQuantity(): void{
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
}
