import { Component, Inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInterface } from '../../../../../../interfaces/all-interfaces';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss'
})
export class HistoryModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserInterface) {
    
  }
}
