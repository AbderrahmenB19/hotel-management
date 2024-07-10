import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('rooms') && !req.url.includes('/deleteRoom') ) return next(req)
  const token = inject(TokenService).token
console.log(token)
  
  if(token){
    const authReq=  req.clone({headers:
      new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
  })
  return next(authReq)

  }
  return next(req);
};
