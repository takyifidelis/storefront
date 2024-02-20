import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenAuthComponent } from '../token-auth/token-auth.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [
    FontAwesomeModule,
    TokenAuthComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss',
})
export class ForgottenPasswordComponent {
  ResetPass: FormGroup;
  error: string | any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.ResetPass = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(
          /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/
        ),
      ]),
    });
  }
  resetPassword(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    this.authService.passwordReset(email).subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['Email-notification']);
        // Set a timeout to navigate to another component after 3 seconds
        setTimeout(() => {
          this.router.navigate(['Password-Authentication']);
        }, 3000);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
  }
}
