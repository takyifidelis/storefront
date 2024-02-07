import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './Pages/LandingPage/landing-page/landing-page.component';
import { LoginComponent } from './Pages/Authentication/CommonComponent/login/login.component';
import { ForgottenPasswordComponent } from './Pages/Authentication/CommonComponent/forgotten-password/forgotten-password.component';
import { SignupMerchantComponent } from './Pages/Authentication/Merchant/signup/signup.component';
import { SignupCustomerComponent } from './Pages/Authentication/Customer/signup/signup.component';
import { ResetPassowrdComponent } from './Pages/Authentication/CommonComponent/reset-passowrd/reset-passowrd.component';
import { TokenAuthComponent } from './Pages/Authentication/CommonComponent/token-auth/token-auth.component';
import { MerchantDashboardComponent } from './Pages/Dashboard/Merchant/merchant-dashboard/merchant-dashboard.component';
import { HomeComponent } from './Pages/Dashboard/Merchant/home/home.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgottenPasswordComponent },
  { path: 'Sign-up-merchant', component: SignupMerchantComponent },
  { path: 'Sign-up-customer', component: SignupCustomerComponent },
  { path: 'email-token-verification', component: TokenAuthComponent },
  { path: 'reset-password', component: ResetPassowrdComponent },
  { path: 'merchant', component: MerchantDashboardComponent,
    children:[
      {path: '', component:HomeComponent}
    ]
  },
  { path: '**', component: LandingPageComponent },
];
