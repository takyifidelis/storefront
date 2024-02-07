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

  password: string = '';
  confirmPassword: string = '';
  isValid: boolean = false;
  isMinTenChar: boolean = false;
  isMinOneNum: boolean = false;
  isMinOneUppercase: boolean = false;
  isMinOneLowercase: boolean = false;

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
        this.isValid = true;
      }
    }
  }
}
