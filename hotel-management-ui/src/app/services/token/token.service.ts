import { Injectable, OnInit } from '@angular/core';
import{JwtHelperService} from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class TokenService  {
   private extractRole(){
    let jwthelperservice = new JwtHelperService();
    let token = this.token;
    let role= jwthelperservice.decodeToken(token as string).authorities[0] as string 
    localStorage.setItem("role",role)

  }
  constructor(){
    if(this.token) this.extractRole();
  }
   
  
   get token() {
    return localStorage.getItem("token") 
  }
   set token(value) {
    localStorage.setItem("token", value as string)
  }
  logout(){
    localStorage.removeItem("token")
    
  }
  isAdmin():boolean{
    const role = localStorage.getItem("role");

    return role==="ADMIN";
  }
  isUser():boolean{
    
    const role = localStorage.getItem("role");
    
    return role=="USER";
  }
  isAuthenticated(){
    
    const token = localStorage.getItem("token")
    console.log(token)
    return !!token 


  }




  
}
