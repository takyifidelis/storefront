import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DataService } from '../Services/data.service';

export const contactUsGuard: CanActivateFn = (route, state) => {
  console.log(route, state);
  
  return inject(DataService).template.includePage.contact? true : false;
};
