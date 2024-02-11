import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';
// import { Subscription } from 'rxjs';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-customer',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupCustomerComponent {
  mailIcon = faEnvelope;
  passwordLock = faLock;
  eyeIcon = faEyeSlash;
  ol = faCircle;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;

  // Email and Password Validation Below
  signupForm: FormGroup;
  error: string | any = null;

  constructor(private authService: AuthService) {
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
        firstName: new FormControl('', Validators.required),
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

    this.authService.signup(email, password).subscribe(
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
}
