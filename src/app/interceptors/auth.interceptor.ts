import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Credentials } from '../interfaces/auth/credentials.interface';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/auth/login'];
  const shouldExclude = excludedUrls.some((url) => req.url.includes(url));

  if (shouldExclude) {
    return next(req);
  }

  const storageService = inject(StorageService);
  const credentials: Credentials =
    storageService.getLocalStorage('credentials');

  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${credentials.tkn}`,
    },
  });

  return next(authReq);
};
