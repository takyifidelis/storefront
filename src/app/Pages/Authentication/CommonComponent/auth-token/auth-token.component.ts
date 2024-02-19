import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-auth-token',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-token.component.html',
  styleUrl: './auth-token.component.scss',
})
export class AuthTokenComponent {
  AuthCode: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.AuthCode = new FormGroup({
      keyOne: new FormControl('', Validators.required),
      keyTwo: new FormControl('', Validators.required),
      keyThree: new FormControl('', Validators.required),
      keyFour: new FormControl('', Validators.required),
      keyFive: new FormControl('', Validators.required),
      keySix: new FormControl('', Validators.required),
    });
  }
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const code = form.value;
    this.authService.verifyAccount(code).subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['authSuccess']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        // this.error = errorMessage;
      }
    );
    form.reset();
  }
}
