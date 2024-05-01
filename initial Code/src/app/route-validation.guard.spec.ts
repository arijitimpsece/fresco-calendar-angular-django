import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeValidationGuard } from './route-validation.guard';

describe('routeValidationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeValidationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
