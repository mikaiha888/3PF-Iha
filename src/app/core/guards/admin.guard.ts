import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);

  return _auth.authUser$.pipe(
    map((authUser) =>
      authUser?.role !== 'ADMIN' ? _router.createUrlTree(['dashboard']) : true
    )
  );
};
