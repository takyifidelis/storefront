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
import { ToastrService } from 'ngx-toastr';
import { APIService } from '../../../../Services/api.service';

@Component({
  selector: 'app-token-auth',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './token-auth.component.html',
  styleUrl: './token-auth.component.scss',
})
export class TokenAuthComponent {
  PasswordAuthCode: FormGroup;
  error: string | any = null;
  isLoading: boolean = false;

  constructor(
    private authService: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.PasswordAuthCode = new FormGroup({
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

    const formValue = this.PasswordAuthCode.value;
    const authCode = [
      formValue.keyOne,
      formValue.keyTwo,
      formValue.keyThree,
      formValue.keyFour,
      formValue.keyFive,
      formValue.keySix,
    ].join('');
    this.isLoading = true;

    this.authService.verifyPassword(authCode).subscribe(
      (resData) => {
        this.isLoading = false;
        this.toastr.info(resData.message, 'Success');
        this.router.navigate(['reset-password']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.toastr.error(errorMessage.error.message, 'Failed');
      }
    );
    form.reset();
  }
  resendVerificationCode() {
    this.authService.resendCode().subscribe((resData) => {
      this.toastr.info('Check Email for verification code', 'Token Sent');

      this.router.navigate(['Email-notification']);
      setTimeout(() => {
        this.router.navigate(['Password-Authentication']);
      }, 3000);
    });
  }
}
