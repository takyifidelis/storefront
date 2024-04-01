import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('customerId')!?.length > 0) {
    return true;
  } else {
    inject(Router).navigate(['/']);
    return false;
  }
};
