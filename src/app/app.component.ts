import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './Pages/Authentication/CommonComponent/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './Pages/Authentication/Customer/signup/signup.component';
import { ForgottenPasswordComponent } from './Pages/Authentication/CommonComponent/forgotten-password/forgotten-password.component';
import { TokenAuthComponent } from './Pages/Authentication/CommonComponent/token-auth/token-auth.component';
import { ResetPassowrdComponent } from './Pages/Authentication/CommonComponent/reset-passowrd/reset-passowrd.component';
import { AuthSuccessfulComponent } from './Pages/Authentication/CommonComponent/auth-successful/auth-successful.component';
import { LandingPageComponent } from './Pages/LandingPage/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    LoginComponent,
    FontAwesomeModule,
    SignupComponent,
    ForgottenPasswordComponent,
    TokenAuthComponent,
    ResetPassowrdComponent,
    AuthSuccessfulComponent,
    LandingPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store-front';
}
