import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const userStr = localStorage.getItem('user');
  let token;
  if(userStr && userStr !==''){
    const user = JSON.parse(userStr)
    if(user && user.token){
      token =user.token;
    }
  }
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization:"Bearer " + token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};