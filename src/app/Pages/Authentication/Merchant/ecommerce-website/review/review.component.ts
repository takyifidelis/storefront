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
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    FontAwesomeModule,
    MatTabsModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  heartIcon = faHeart;
  starIcon = faStar;
  quantity: number = 1;
  amount: number = this.quantity * 90;

  increaseQuantity(): void {
    this.quantity++;
    this.amount = this.quantity * 90;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.amount = this.quantity * 90;
    }
  }
}
