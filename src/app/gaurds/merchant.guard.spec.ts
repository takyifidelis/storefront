import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { merchantAuthGuard } from './merchant.guard';

describe('merchantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => merchantAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
