import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DataService } from '../Services/data.service';

export const aboutUsGuard: CanActivateFn = (route, state) => {
  return inject(DataService).template.pagesOrder[1].includePage ? true : false;
};
