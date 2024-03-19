import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import {
  faEnvelope,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';
import { APIService } from '../../../../Services/api.service';

@Component({
  selector: 'app-signup-merchant',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, ReactiveFormsModule, CommonModule],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupMerchantComponent {
  mailIcon = faEnvelope;
  facebookIcon = faFacebook;
  googleIcon = faGoogle;
  ol = faCircle;
  eyeIcon = faEyeSlash;
  eyeIcon2 = faEyeSlash;
  showConfirmedPassword: boolean | undefined;
  showPassword: boolean | undefined;
  isLoading = false;

  signupForm: FormGroup;
  error: string | any = null;

  constructor(
    private authService: APIService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(
            /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/
          ),
        ]),
        password: new FormControl('', [
          Validators.required,
          this.passwordValidator,
        ]),
        confirmPassword: new FormControl('', Validators.required),
        businessName: new FormControl('', Validators.required),
      },
      { validators: this.confirmPasswordValidator }
    );
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    const businessName = form.value.businessName;
    const type = 'Business';
    this.isLoading = true;

    this.authService
      .signupMerchant(businessName, email, type, password, confirmPassword)
      .subscribe(
        (resData) => {
          this.toastr.info('Check your Email for token', 'Email Verification');
          this.isLoading = false;
          this.router.navigate(['Authentication'], {
            queryParams: { action: 'signup' },
          });
        },
        (errorMessage) => {
          this.isLoading = false;

          this.toastr.error(errorMessage.error.message, 'Failed');
        }
      );
    form.reset();
  }
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
    const passwordControl = this.signupForm.get('password');
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

  onShowPassword() {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? faEye : faEyeSlash;
  }

  onShowConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
    this.eyeIcon2 = this.showConfirmedPassword ? faEye : faEyeSlash;
  }
}
