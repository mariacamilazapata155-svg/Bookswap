import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    if (!this.email || !this.password) {
      console.log('Por favor, completa los campos');
      return;
    }

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        await this.router.navigateByUrl('/tabs/libros', { replaceUrl: true });
      } else {
        console.log('Credenciales inválidas (mock).');
      }
    } catch (err) {
      console.error('Error durante login:', err);
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/inicio');
  }

  goToForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
