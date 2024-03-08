declare var google: any;
import { ToastrService } from 'ngx-toastr';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  NgForm,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../Auth/auth.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { APIService } from '../../../../Services/api.service';
import { DataService } from '../../../../Services/data.service';

import { environment } from '../../../../../environments/environment.development';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  user: SocialUser | undefined;
  isLoggedIn: boolean | undefined;
  passwordLock = faLock;
  mailIcon = faEnvelope;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  eyeIcon = faEyeSlash;
  showPassword = false;
  isLoading: boolean = false;

  @ViewChild('search') search!: ElementRef;

  constructor(
    private authService: SocialAuthService,
    @Inject(DOCUMENT) private document: Document,
    private loginService: AuthService,
    private apiService: APIService,
    public dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // this.dataService.isLoading = false;
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.isLoggedIn = user != null;
    });
  }

  // onGoogle() {
  // this.document.getElementsByName('asl-google-signin-button')
  // console.log(  this.document.getElementsByTagName('asl-google-signin-button')
  // )

  //Login using Email and Password implementation
  loginForm: FormGroup;
  error: string | any = null;
  onSubmit(form: FormGroupDirective) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.loginService.login(email, password).subscribe(
      (resData) => {
        // this.toastr.success('Success', 'Login Account!');
        this.isLoading = false;
        console.log(resData);
        if (resData.data?.type == 'Business') {
          if (resData.type == 'Business') {
            localStorage.setItem('businessId', resData.data.business);
            this.router.navigate(['merchant']);
          } else if (resData.data?.type == 'Customer') {
          } else if (resData.type == 'Customer') {
            localStorage.setItem(
              'customerId',
              JSON.stringify(resData.data.customer)
            );
            this.router.navigate(['customer']);
          }
        }
      },

      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.toastr.error('Failed', this.error);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;

    this.eyeIcon = this.showPassword ? faEye : faEyeSlash;
  }

  newLogin(ata: any) {
    this.isLoading = true;

    //     this.dataService.isLoading = true
    this.apiService
      .authenticateUser(this.dataService.loginCredentials)
      .subscribe(
        (resData: any) => {
          console.log(resData);

          this.isLoading = false;
          this.toastr.success('Login Successful', 'Success');
          if (resData.data.type === 'Business') {
            // this.dataService.businessId=resData.data?.business
            localStorage.setItem('businessId', resData.data.business);

            this.router.navigate(['merchant']);
          } else if (resData.data.type === 'Customer') {
            localStorage.setItem('customerId', resData.data.customer);
            //           this.dataService.isLoading =false
            this.router.navigate(['customer']);
          } else {
            console.log(resData);

            // this.dataService.isLoading = false;
          }
        },
        (errorMessage: any) => {
          this.isLoading = false;
          console.log(errorMessage);
          this.error = errorMessage;
          this.toastr.error(this.error, 'Login Failed');
        }
      );
    this.dataService.loginCredentials = { email: '', password: '' };
  }

  handleGoogleResponse() {
    // this.apiService.getGoogle().subscribe((res: any)=> {
    //   console.log(res)
    // })
    window.open(`${environment.baseApiUrl}/account/google/auth`, '_self');
  }
}
