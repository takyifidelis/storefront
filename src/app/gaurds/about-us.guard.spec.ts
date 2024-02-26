import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aboutUsGuard } from './about-us.guard';

describe('aboutUsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aboutUsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
