import { Component, Inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserInterface } from '../../../../../../interfaces/all-interfaces';
import { APIService } from '../../../../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatIconModule, CommonModule],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss',
})
export class HistoryModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private apiService: APIService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<HistoryModalComponent>
  ) {}

  onDeleteProduct() {
    let deleteIds: string[] = [];
    deleteIds.push(this.data.id);
    this.apiService
      .removeProductFromFavorite(deleteIds, localStorage.getItem('customerId')!)
      .subscribe(
        (deleteResponse) => {
          this.toastr.info(deleteResponse.message, 'Success');
          this.dialogRef.close('Success');
        },
        (errorMessage) => {
          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );
  }
}
