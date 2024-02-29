import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { APIService } from '../../../../Services/api.service';

@Component({
  selector: 'app-reset-passowrd',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './reset-passowrd.component.html',
  styleUrl: './reset-passowrd.component.scss',
})
export class ResetPassowrdComponent {
  ol = faCircle;
  eyeIcon = faEyeSlash;
  eyeIcon2 = faEyeSlash;
  showConfirmedPassword: boolean | undefined;
  showPassword: boolean | undefined;
  isLoading: boolean = false;

  ResetPassword: FormGroup;
  error: string | any = null;

  constructor(
    private authService: APIService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.ResetPassword = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          this.passwordValidator,
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.confirmPasswordValidator }
    );
  }
  //
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }

    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    this.isLoading = true;
    this.authService.newPasswordReset(password, confirmPassword).subscribe(
      (resData) => {
        console.log(resData);
        this.toastr.success('Proceed to Login', 'Password Reset Successful!');
        this.isLoading = false;
        this.router.navigate(['login']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
        this.toastr.error(this.error, 'Error');
      }
    );
    form.reset();
  }

  //
  // Custom validator function for password strength and matching
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    if (!value) {
      return null; // Don't validate empty value
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /\d+/.test(value);
    const hasMinLength = value.length >= 10;
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;
    return !valid ? { passwordStrength: true } : null;
  }
  // Custom validator function for matching passwords
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsNotMatching: true };
    }
    return null;
  }

  // Function to check various conditions of password
  checkPasswordCondition(condition: RegExp): boolean {
    const passwordControl = this.ResetPassword.get('password');
    if (!passwordControl) {
      return false;
    }
    const password = passwordControl.value || '';
    return condition.test(password);
  }

  // Usage
  containsLowerCase(): boolean {
    return this.checkPasswordCondition(/[a-z]+/);
  }

  containsUpperCase(): boolean {
    return this.checkPasswordCondition(/[A-Z]+/);
  }

  containsNumeric(): boolean {
    return this.checkPasswordCondition(/\d+/);
  }

  containsMinTenChar(): boolean {
    return this.checkPasswordCondition(/^.{10,}$/);
  }
  //

  onShowPassword() {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? faEye : faEyeSlash;
  }

  onShowConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
    this.eyeIcon2 = this.showConfirmedPassword ? faEye : faEyeSlash;
  }
}
