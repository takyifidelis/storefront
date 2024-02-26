import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contactUsGuard } from './contact-us.guard';

describe('contactUsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contactUsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
