import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Authentication/Auth/auth.service';
import { APIService } from '../../../../../Services/api.service';

@Component({
  selector: 'app-merchant-add-product',
  standalone: true,
  imports: [
    MatRadioModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './merchant-add-product.component.html',
  styleUrl: './merchant-add-product.component.scss',
})
export class MerchantAddProductComponent {
  images: string[] = []; // Assuming we don't need topImages and bottomImages arrays separately anymore
  productForm: FormGroup;
  error: string | any = null;
  files: any;
  data = new FormData();
  categories: string[] = ['Dresses', 'Tops', 'Sneakers', 'Accessories'];
  productDetails = {
    name: '',
    price: '',
    quantity: '',
    description: '',
    isActive: 'true',
    category: '',
  };
  onFileSelected(event: any) {
    for (const file of event.target.files) {
      this.data.append('images', file);
    }
    const files: FileList = event.target.files;
    if (files) {
      const remainingSlots = 4 - this.images.length;
      const filesToAdd = Math.min(files.length, remainingSlots);
      for (let i = 0; i < filesToAdd; i++) {
        const file = files.item(i);
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  showDragAndDrop(): boolean {
    return this.images.length < 4;
  }

  constructor(private authService: APIService, private router: Router) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      productStock: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      category: new FormControl(''),
      productImages: new FormControl(''),
    });
  }

  onSubmit() {
    this.data.append('name', this.productDetails.name);
    this.data.append('price', this.productDetails.price);
    this.data.append('quantity', this.productDetails.quantity);
    this.data.append('description', this.productDetails.description);
    this.data.append('isActive', 'true');
    this.data.append('category', this.productDetails.category);
    console.log(this.data);

    this.authService.postProduct(this.data).subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    this.productDetails = {
      name: '',
      price: '',
      quantity: '',
      description: '',
      isActive: 'true',
      category: '',
    };
  }

  resetProductForm() {
    this.productDetails = {
      name: '',
      price: '',
      quantity: '',
      description: '',
      isActive: 'true',
      category: '',
    };
  }
}
