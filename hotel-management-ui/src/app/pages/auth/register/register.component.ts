import { Component } from '@angular/core';
import { RegisterRequest } from '../../../services/models';
import { AuthService } from '../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMsg:string[]|undefined
resgiterRequest: RegisterRequest={
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: ''
}
constructor(private authService:AuthService, private router:Router){ }
register() {
  this.authService.register({
    body:this.resgiterRequest
  }).subscribe({
    next: val=>{
      this.router.navigate(["/activate-account"])
    },error:err=>{
      console.log(err);
      this.errorMsg = err.error.validationErrors;
    }
  })
  }

}
