import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// import { LoginComponent } from './Pages/Authentication/CommonComponent/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingPageComponent } from './Pages/LandingPage/landing-page/landing-page.component';
import { ForgottenPasswordComponent } from './Pages/Authentication/CommonComponent/forgotten-password/forgotten-password.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    LandingPageComponent,
    RouterModule,
    ForgottenPasswordComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store-front';
}
