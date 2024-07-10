import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router)
  if(!tokenService.isAuthenticated()){
    router.navigate(['login']);
    return false;   
  }
  return true

};
