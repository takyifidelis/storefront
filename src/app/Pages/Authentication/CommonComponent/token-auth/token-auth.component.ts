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
    private authService: AuthService,
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
    console.log({ code: authCode });
    this.isLoading = true;

    this.authService.verifyPassword(authCode).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.toastr.info('Email is verified', 'Rest Password');
        this.router.navigate(['reset-password']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
        this.toastr.error(this.error, 'Error');
      }
    );
    //
    form.reset();
  }
}
