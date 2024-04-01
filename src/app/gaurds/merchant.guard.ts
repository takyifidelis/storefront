import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const merchantAuthGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('businessId')!?.length > 0) {
    return true;
  }
  inject(Router).navigate(['/']);
  return false;
};
