import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup-merchant',
  standalone: true,
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupMerchantComponent {
  mailIcon = faEnvelope;
  eyeIcon = faEyeSlash;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  ol = faCircle;

  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(
          /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/
        ),
      ]),
      password: new FormControl('', Validators.required),
    });

    this.authService.signup().subscribe((resData) => {
      console.log(resData);
    });
  }

  // onSubmit(form: FormGroupDirective) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;

  //   this.authService.signup().subscribe(
  //     (resData) => {
  //       console.log(resData);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   form.reset();
  // }
}
