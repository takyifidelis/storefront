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
import { CustomerDashboardComponent } from './Pages/Dashboard/Customer/customer-dashboard/customer-dashboard.component';
import { HomeEcommerceComponent } from './Pages/Authentication/Merchant/ecommerce-website/home-ecommerce/home-ecommerce.component';
import { AboutUsComponent } from './Pages/Authentication/Merchant/ecommerce-website/about-us/about-us.component';
import { ContactUsComponent } from './Pages/Authentication/Merchant/ecommerce-website/contact-us/contact-us.component';
import { OnboardingStepOneComponent } from './Pages/Authentication/CommonComponent/onboarding-step-one/onboarding-step-one.component';
import { OnboardingStepTwoComponent } from './Pages/Authentication/CommonComponent/onboarding-step-two/onboarding-step-two.component';
import { OnboardingStepThreeComponent } from './Pages/Authentication/CommonComponent/onboarding-step-three/onboarding-step-three.component';
import { ReviewComponent } from './Pages/Authentication/Merchant/ecommerce-website/review/review.component';
import { EmailNotificationComponent } from './Pages/Authentication/CommonComponent/forgotten-password/email-notification/email-notification.component';
import { AuthTokenComponent } from './Pages/Authentication/CommonComponent/auth-token/auth-token.component';
import { ShopComponent } from './Pages/Dashboard/Customer/components/shop/shop.component';
import { FavoriteProductComponent } from './Pages/Dashboard/Customer/components/favorite-product/favorite-product.component';
import { HistoryComponent } from './Pages/Dashboard/Customer/components/history/history.component';
import { OrderComponent } from './Pages/Dashboard/Customer/components/order/order.component';

import { PaymentOptionComponent } from './Pages/Dashboard/Customer/components/payment-option/payment-option.component';
import { NewPaymentOptionComponent } from './Pages/Dashboard/Customer/components/new-payment-option/new-payment-option.component';
import { contactUsGuard } from './gaurds/contact-us.guard';
import { aboutUsGuard } from './gaurds/about-us.guard';
import { MerchantAddProductComponent } from './Pages/Dashboard/Merchant/components/merchant-add-product/merchant-add-product.component';
import { CkeckoutPageComponent } from './Pages/Dashboard/Customer/components/ckeckout-page/ckeckout-page.component';
import { AuthSuccessfulComponent } from './Pages/Authentication/CommonComponent/auth-successful/auth-successful.component';
import { MerchantProductsDashboadComponent } from './Pages/Dashboard/Merchant/components/merchant-products-dashboad/merchant-products-dashboad.component';
import { authGuard } from './gaurds/auth.guard';

import { commonGuard } from './gaurds/common.guard';
import { merchantAuthGuard } from './gaurds/merchant.guard';
import { OnboardingStepOneCustomerComponent } from './Pages/Dashboard/Customer/components/onboarding/onboarding-step-one-customer/onboarding-step-one-customer.component';
import { OnboardingStepTwoCustomerComponent } from './Pages/Dashboard/Customer/components/onboarding/onboarding-step-two-customer/onboarding-step-two-customer.component';
import { WalletComponent } from './Pages/Dashboard/Merchant/home/wallet/wallet.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'customer-onboarding-1', component: OnboardingStepOneCustomerComponent },
  { path: 'customer-onboarding-2', component: OnboardingStepTwoCustomerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgottenPasswordComponent },
  { path: 'email-notification', component: EmailNotificationComponent },
  { path: 'auth-token', component: AuthTokenComponent },
  { path: 'Sign-up-merchant', component: SignupMerchantComponent },
  { path: 'Sign-up-customer', component: SignupCustomerComponent },
  { path: 'reset-password', component: ResetPassowrdComponent },
  { path: 'page-creator', component: PageCreatorComponent },
  {
    path: 'merchant-onboarding-1',
    canActivate: [merchantAuthGuard],
    component: OnboardingStepOneComponent,
  },
  {
    path: 'merchant-onboarding-2',
    canActivate: [merchantAuthGuard],
    component: OnboardingStepTwoComponent,
  },
  {
    path: 'merchant-onboarding-3',
    canActivate: [merchantAuthGuard],
    component: OnboardingStepThreeComponent,
  },
  { path: 'Authentication', component: AuthTokenComponent },
  { path: 'Password-Authentication', component: TokenAuthComponent },
  { path: 'authSuccess', component: AuthSuccessfulComponent },
  { path: 'Email-notification', component: EmailNotificationComponent },
  { path: 'reset-password', component: ResetPassowrdComponent },
  {
    path: 'template-editor',
    component: TemplateEditorComponent,
    canActivate: [merchantAuthGuard],
    children: [
      {
        path: '',
        component: EcommerceWebsiteComponent,
        children: [
          { path: 'home', component: HomeEcommerceComponent },
          {
            path: 'about',
            canActivate: [aboutUsGuard],
            component: AboutUsComponent,
          },
          {
            path: 'contact',
            canActivate: [contactUsGuard],
            component: ContactUsComponent,
          },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
    ],
  },
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'shop', component: ShopComponent },
      { path: 'fav-product', component: FavoriteProductComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'new-payment-opt', component: NewPaymentOptionComponent },
      { path: 'payment-opt', component: PaymentOptionComponent },
      { path: 'orders', component: OrderComponent },
      { path: '', redirectTo: 'shop', pathMatch: 'full' },
    ],
  },
  { path: 'ecommerce/checkout-page', component: CkeckoutPageComponent },
  { path: 'checkout-page', component: CkeckoutPageComponent },
  {
    path: 'merchant',
    component: MerchantDashboardComponent,
    canActivate: [merchantAuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'discount', component: MerchantDiscountComponent },
      { path: 'reviews', component: MerchantReviewsComponent },
      { path: 'order', component: MerchantOrdersComponent },
      { path: 'customers', component: MerchantCustomersComponent },
      { path: 'analytics', component: MerchantAnalyticsComponent },
      {
        path: 'product',
        component: MerchantProductsComponent,
        children: [
          { path: 'add-product', component: MerchantAddProductComponent },
          { path: '', component: MerchantProductsDashboadComponent },
        ],
      },
    ],
  },
  {
    path: 'ecommerce',
    component: EcommerceWebsiteComponent,
    canActivate: [commonGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeEcommerceComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'shop/:id', component: ReviewComponent },
    ],
  },
];
