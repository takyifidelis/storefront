import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DataService } from '../Services/data.service';

export const contactUsGuard: CanActivateFn = (route, state) => {
  return inject(DataService).template.pagesOrder[2].includePage ? true : false;
};
