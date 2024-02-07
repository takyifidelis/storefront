import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './Pages/LandingPage/landing-page/landing-page.component';
import { LoginComponent } from './Pages/Authentication/CommonComponent/login/login.component';
import { ForgottenPasswordComponent } from './Pages/Authentication/CommonComponent/forgotten-password/forgotten-password.component';
import { SignupMerchantComponent } from './Pages/Authentication/Merchant/signup/signup.component';
import { SignupCustomerComponent } from './Pages/Authentication/Customer/signup/signup.component';

export const routes: Routes = [
  { path: '', component: ForgottenPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: LandingPageComponent },
  { path: 'Sign-up-customer', component: SignupCustomerComponent },
  { path: 'Sign-up-merchant', component: SignupMerchantComponent },
  { path: '**', component: LandingPageComponent },
];
