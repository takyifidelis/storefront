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
    this.loginService.login(email, password).subscribe(
      (resData) => {
        this.toastr.success('Success', 'Login Account!');
        console.log(resData);
        if (resData.data?.type == 'Business') {
          this.router.navigate(['merchant']);
        } else if (resData.data?.type == 'Customer') {
          this.router.navigate(['customer']);
        }
      },
      (errorMessage) => {
        this.toastr.error('Success', 'Login Account!');
        console.log(errorMessage);
        this.error = errorMessage;
        this.toastr.error('Success', this.error);
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
    this.apiService
      .authenticateUser(this.dataService.loginCredentials)
      .subscribe(
        (resData: any) => {
          this.toastr.success('Login Successful', 'Success');
          console.log(resData.data);
          this.dataService.businessId = resData.data?.business;
          this.router.navigate(['/merchant']);
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.toastr.error(this.error, 'Login Failed');
          this.isLoading = false;
        }
      );
    this.dataService.loginCredentials = { email: '', password: '' };
  }

  showSuccess() {
    this.toastr.info('Hello world!', 'Toastr fun!');
  }
}
