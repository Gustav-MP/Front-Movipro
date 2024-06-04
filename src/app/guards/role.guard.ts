import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Array<string>;

  try {
    const userRole = await authService.userRole();
    const hasRole = expectedRoles.includes(userRole);
    if (!hasRole) {
      router.navigate(['/login']);
    }
    return hasRole;
  } catch (error) {
    console.error('Error checking roles:', error);
    router.navigate(['/login']);
    return false;
  }
};
