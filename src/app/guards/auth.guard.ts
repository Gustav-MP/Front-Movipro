import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);
  const isLogged = await authService.isLogged();
  if (isLogged) {
    return true;
  } else {
    storageService.deleteLocalStorage();
    router.navigate(['/login']);
    return false;
  }
};
