import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  error: string | any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.AuthCode = new FormGroup({
      keyOne: new FormControl('', Validators.required),
      keyTwo: new FormControl('', Validators.required),
      keyThree: new FormControl('', Validators.required),
      keyFour: new FormControl('', Validators.required),
      keyFive: new FormControl('', Validators.required),
      keySix: new FormControl('', Validators.required),
    });
  }

  submitCode(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }

    const formValue = this.AuthCode.value;
    const authCode = [
      formValue.keyOne,
      formValue.keyTwo,
      formValue.keyThree,
      formValue.keyFour,
      formValue.keyFive,
      formValue.keySix,
    ].join('');
    console.log({ code: authCode });

    this.authService.verifyAccount(authCode).subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['authSuccess']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    //
    form.reset();
  }
  resendVerificationCode() {
    this.authService.resendCode().subscribe((resData) => {
      this.router.navigate(['Email-notification']);
      // Set a timeout to navigate to another component after 3 seconds
      setTimeout(() => {
        this.router.navigate(['Authentication']);
      }, 3000);
    });
  }
}
