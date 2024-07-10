import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
logout() {

  const logout =window.confirm("are you sure you really want to logout  ")
  if(logout) {
    this.tokenservice.logout()
    window.location.reload()
  }
}
  constructor(private tokenservice:TokenService){}
  isAdmin= this.tokenservice.isAdmin()
  isUser= this.tokenservice.isUser()
  isAuthenticated=this.tokenservice.isAuthenticated()


}
