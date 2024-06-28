import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Credentials } from '../interfaces/auth/credentials.interface';

interface HttpHeaders {
  Authorization: string;
  [key: string]: string;
}

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/auth/login'];
  const uploadFileUrl = '/glovebox/file/upload';

  const shouldExclude = excludedUrls.some((url) => req.url.includes(url));
  const isUploadRequest = req.url.includes(uploadFileUrl);

  if (shouldExclude) {
    return next(req);
  }

  const storageService = inject(StorageService);
  const credentials: Credentials =
    storageService.getLocalStorage('credentials');

  const headers: HttpHeaders = {
    Authorization: `Bearer ${credentials.tkn}`,
  };

  if (isUploadRequest) {
    // Para solicitudes de carga de archivos, NO establecemos el Content-Type
    // Angular lo hará automáticamente a 'multipart/form-data'
  } else {
    headers['Content-Type'] = 'application/json';
  }

  const authReq = req.clone({ setHeaders: headers });

  return next(authReq);
};
