import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
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
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  GoogleLoginProvider,
  GoogleSigninButtonDirective,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { APIService } from '../../../../Services/api.service';

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
  ol = faCircle;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  user: SocialUser | undefined;
  showPassword: boolean | undefined;
  showConfirmedPassword: boolean | undefined;
  eyeIcon = faEyeSlash;
  eyeIcon2 = faEyeSlash;
  isLoading: boolean = false;

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
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      },
      { validators: this.confirmPasswordValidator }
    );
  }
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    let userCredentials = {
      firstName: form.value.lastName,
      lastName: form.value.firstName,
      email: form.value.email,
      type: 'Customer',
      password: form.value.confirmPassword,
      confirmPassword: form.value.password,
    };
    this.isLoading = true;
    this.authService.merchantSignup(userCredentials).subscribe(
      (resData) => {
        this.toastr.info('Check your Email for token', 'Email Verification');
        this.isLoading = false;
        this.router.navigate(['Authentication']);
      },
      (errorMessage) => {
        this.isLoading = false;

        this.toastr.error(errorMessage.error.message, 'Failed');
      }
    );
    form.reset();
  }
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    if (!value) {
      return null; 
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /\d+/.test(value);
    const hasMinLength = value.length >= 10;
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;
    return !valid ? { passwordStrength: true } : null;
  }
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsNotMatching: true };
    }
    return null;
  }

  checkPasswordCondition(condition: RegExp): boolean {
    const passwordControl = this.signupForm.get('password');
    if (!passwordControl) {
      return false;
    }
    const password = passwordControl.value || '';
    return condition.test(password);
  }
  
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

  onSignUp(): void {}
}
