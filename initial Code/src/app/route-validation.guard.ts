import { CanActivateFn } from '@angular/router';

export const routeValidationGuard: CanActivateFn = (route, state) => {
  return true;
};
