import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-merchant-discount',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './merchant-discount.component.html',
  styleUrl: './merchant-discount.component.scss',
})
export class MerchantDiscountComponent {
  filterIcon = faFilter;
  seaechICon = faSearch;
  checkIcon = faCheck;
  showForm: boolean = false;
  constructor(public dataService: DataService) {}

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
