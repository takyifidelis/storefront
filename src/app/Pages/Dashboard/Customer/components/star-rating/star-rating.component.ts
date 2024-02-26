import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  faStar = faStar;
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }
}
