import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;
    }
    input, button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // simple placeholder, later connect to backend auth
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
