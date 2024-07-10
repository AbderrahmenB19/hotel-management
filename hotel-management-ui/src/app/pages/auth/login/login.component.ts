import { Component} from '@angular/core';

import { AuthService } from '../../../services/services';
import { TokenService } from '../../../services/token/token.service';
import { LoginRequest, LoginResponse } from '../../../services/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

errorMsg: Array<string> = [];
LoginRequest:LoginRequest={
  email: '',
  password: ''
}
constructor(private authService:AuthService, private tokenService:TokenService, private router:Router){}

login() {
  this.errorMsg = [];
  this.tokenService.logout()
  this.authService.login({
    body:this.LoginRequest
  }).subscribe({
    next: (data: LoginResponse) => {  
      this.tokenService.token=data.token as string 
      setTimeout(() => {
        this.router.navigate(['rooms']).then(() => {
          window.location.reload();
        });
      }, 1000);
    }, error:err=>{
      if (err.error.validationErrors) {
        this.errorMsg = err.error.validationErrors;
      } else {
        this.errorMsg?.push(err.error.error);
      }
    }
  })
  }
  
}


