import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss'
})
export class OrderModalComponent {
active = true;
active1 = false;
active2 = false;

isActive(val:number): void {
  switch (val) {
    case 1:
    this.active = true
    this.active1 = false
    this.active2 = false
    break;
    case 2: 
    this.active = false
    this.active1 = true
    this.active2 = false
    break;
    case 3:
    this.active = false
    this.active1 = false
    this.active2 = true
    break;
    default:
    break;
  }
}

}
