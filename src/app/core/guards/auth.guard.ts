import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _auth = inject(AuthService);  
  const isAuth = _auth.verifyToken();
  
  return isAuth || _router.createUrlTree(['auth']);
};
