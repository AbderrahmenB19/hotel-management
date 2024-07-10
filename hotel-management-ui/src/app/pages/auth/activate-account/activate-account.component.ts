import { Component } from '@angular/core';
import { AuthService } from '../../../services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'] // Corrected the typo from 'styleUrl' to 'styleUrls'
})
export class ActivateAccountComponent {
  message = 'Token is expired or invalid. Please try again.';
  isOkay = true;
  submitted = false;

  constructor(private authService: AuthService) {}

  private confirmToken(code: string) {
    this.authService.activateAccount({ token: code }).subscribe({
      next: (res:any) => {
        this.isOkay = true;
        this.submitted = true;
        console.log(res)
      },
      error: (err) => {
        console.log(err)
        this.submitted = true;
        this.isOkay = false;
        // Optionally, you can set an error message from the response if available
        // this.message = err.error?.message || this.message;
      }
    });
  }

  onCodeCompleted(token: string) {
    this.confirmToken(token);
    
  }

  redirectToLogin() {
    // Your logic to redirect to the login page
    // For example, you can use Angular Router:
    // this.router.navigate(['/login']);
  }
}
