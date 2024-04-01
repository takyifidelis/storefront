import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { APIService } from '../../../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-merchant-order-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    CommonModule
  ],
  templateUrl: './merchant-order-modal.component.html',
  styleUrl: './merchant-order-modal.component.scss'
})
export class MerchantOrderModalComponent {
  error: string | any = null;
  sum = 0;
  orderId?: string

  starRating!: number;

  constructor(
    private apiService: APIService,
    @Inject(MAT_DIALOG_DATA) public data: { [key: string]: any }
  ) {
    
    console.log(data);
  }
  ngOnInit(): void {
     
    for (const itemPrice of this.data['items']) {
      this.sum += itemPrice.price;
      
    }
  }

  shipped(orderId: string) {
    console.log('shipped:'+this.data['id'])
    this.apiService.orderShipped(this.data['id']).subscribe((res: any) => {
      console.log(res);
    })
  }

  delivered(orderId: string) {
    console.log('shipped:'+`${this.data['id']}`)
    this.apiService.orderDelivered(this.data['id']).subscribe((res: any)=> {
      console.log(res)
    })
  }

  cancelled(){
    this.apiService.orderCancelled(this.data).subscribe((response: any) => {
    })
  }

  
}
