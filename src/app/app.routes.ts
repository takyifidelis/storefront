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
import { TemplateEditorComponent } from './Pages/Dashboard/Merchant/components/template-editor/template-editor.component';
import { MerchantProductsComponent } from './Pages/Dashboard/Merchant/components/merchant-products/merchant-products.component';
import { MerchantDiscountComponent } from './Pages/Dashboard/Merchant/components/merchant-discount/merchant-discount.component';
import { MerchantReviewsComponent } from './Pages/Dashboard/Merchant/components/merchant-reviews/merchant-reviews.component';
import { MerchantOrdersComponent } from './Pages/Dashboard/Merchant/components/merchant-orders/merchant-orders.component';
import { MerchantCustomersComponent } from './Pages/Dashboard/Merchant/components/merchant-customers/merchant-customers.component';
import { MerchantAnalyticsComponent } from './Pages/Dashboard/Merchant/components/merchant-analytics/merchant-analytics.component';
import { EcommerceWebsiteComponent } from './Pages/Authentication/Merchant/ecommerce-website/ecommerce-website.component';
import { PageCreatorComponent } from './Pages/Dashboard/Merchant/components/page-creator/page-creator.component';
import { AuthComponent } from './Pages/Authentication/Auth/auth.component';

export const routes: Routes = [
  // { path: '', component: LandingPageComponent },
  { path: '', component: EcommerceWebsiteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgottenPasswordComponent },
  { path: 'Sign-up-merchant', component: SignupMerchantComponent },
  { path: 'Sign-up-customer', component: SignupCustomerComponent },
  { path: 'email-token-verification', component: TokenAuthComponent },
  { path: 'reset-password', component: ResetPassowrdComponent },
  { path: 'template-editor', component: TemplateEditorComponent },
  { path: 'page-creator', component: PageCreatorComponent },
  {
    path: 'merchant',
    component: MerchantDashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: MerchantProductsComponent },
      { path: 'discount', component: MerchantDiscountComponent },
      { path: 'reviews', component: MerchantReviewsComponent },
      { path: 'order', component: MerchantOrdersComponent },
      { path: 'customers', component: MerchantCustomersComponent },
      { path: 'analytics', component: MerchantAnalyticsComponent },
    ],
  },
  { path: '**', component: LandingPageComponent },
];
