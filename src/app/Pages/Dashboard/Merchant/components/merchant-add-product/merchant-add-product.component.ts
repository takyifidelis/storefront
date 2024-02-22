import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Authentication/Auth/auth.service';

@Component({
  selector: 'app-merchant-add-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './merchant-add-product.component.html',
  styleUrl: './merchant-add-product.component.scss',
})
export class MerchantAddProductComponent {
  images: string[] = []; // Assuming we don't need topImages and bottomImages arrays separately anymore
  productForm: FormGroup;
  error: string | any = null;

  onFileSelected(event: any) {
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

  constructor(private authService: AuthService, private router: Router) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      productStock: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      category: new FormControl(''),
      productImages: new FormControl(''),
    });
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      console.log('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.value.productName);
    formData.append('price', form.value.productPrice);
    formData.append('quantity', form.value.productStock);
    formData.append('description', form.value.productDescription);
    formData.append('category', form.value.category);
    formData.append('isActive', 'true');
    formData.append('variations', '[{"type": "color", "value":"1"}]');
    console.log(formData);
    // Add each image to formData
    const images: File[] = form.value.productImages;

    console.log(images);

    if (images && images.length) {
      for (let i = 0; i < images.length; i++) {
        if (!(images[i] instanceof File)) {
          console.error('Item is not a File', images[i]);
          continue;
        }

        formData.append('images', images[i], images[i].name);
      }
    }

    this.authService.postProduct(formData).subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    form.reset();
  }
  resetProductForm(form: FormGroupDirective) {
    form.reset();
  }
}
