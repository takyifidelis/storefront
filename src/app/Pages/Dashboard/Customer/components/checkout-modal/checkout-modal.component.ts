import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserInterface } from '../../../../../interfaces/all-interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss'
})
export class CheckoutModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserInterface, private toastr: ToastrService, private dialogRef: MatDialogRef<CheckoutModalComponent>) {
  }

  selectShipping(){
    localStorage.setItem('shippingId', this.data.id);
    this.dialogRef.close();
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
