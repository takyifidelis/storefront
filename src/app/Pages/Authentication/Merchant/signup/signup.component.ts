import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-merchant',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupMerchantComponent {
  mailIcon = faEnvelope;
  eyeIcon = faEyeSlash;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  ol = faCircle;
  // input fields
  email: string = '';
  password: string = '';
  firstName: string = '';
  businessName: string = '';

  confirmPassword: string = '';
  isValid: boolean = false;
  isMinTenChar: boolean = false;
  isMinOneNum: boolean = false;
  emailIsValid: boolean = false;
  isEmailValid: boolean = false;
  passwordIsValid: boolean = false;
  isMinOneUppercase: boolean = false;
  isMinOneLowercase: boolean = false;
  isBusinessNameValid: boolean = false;
  isFirstNameValid: boolean = false;
  validMerchant: boolean = false;

  validateBusiness() {}

  validateMerchant() {
    this.isFirstNameValid = /^.{3,}$/.test(this.firstName);
    this.isBusinessNameValid = /^.{3,}$/.test(this.businessName);
    if (this.isBusinessNameValid && this.isFirstNameValid) {
      this.validMerchant = true;
    } else {
      this.validMerchant = false;
    }
  }

  validatePassword() {
    this.isMinTenChar = /[\w]{10,}/.test(this.password);
    this.isMinOneNum = /[\d]/.test(this.password);
    this.isMinOneUppercase = /[A-Z]/.test(this.password);
    this.isMinOneLowercase = /[a-z]/.test(this.password);

    if (
      this.isMinTenChar &&
      this.isMinOneLowercase &&
      this.isMinOneNum &&
      this.isMinOneUppercase
    ) {
      if (this.password === this.confirmPassword) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    } else {
      this.passwordIsValid = false;
    }
  }

  validateEmail() {
    this.isEmailValid =
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(this.email);
    if (this.isEmailValid) {
      this.emailIsValid = true;
      console.log('EMail works');
    } else {
      this.emailIsValid = false;
    }
  }
}
