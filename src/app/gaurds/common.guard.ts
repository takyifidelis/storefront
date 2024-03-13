import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const commonGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('customerId')!?.length > 0;
  const isMerchant = localStorage.getItem('businessId')!?.length > 0;
  if (isAuthenticated || isMerchant) {
    return true;
  } else {
    console.log('You are not authorized to access this route');
    inject(Router).navigate(['/']);
    return false;
  }
};
