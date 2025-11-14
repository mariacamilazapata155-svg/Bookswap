import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: './tab-inicio.page.html',
  styleUrls: ['./tab-inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabInicioPage {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  isInvalid(form: any, field: string): boolean {
    const control = form.controls[field];
    return control && control.invalid && (control.dirty || control.touched);
  }

  passwordsDoNotMatch(): boolean {
    const { password, confirmPassword } = this.user;
    return !!(password && confirmPassword && password !== confirmPassword);
  }

  async register(form: NgForm) {
    if (form.invalid) return;

    if (this.user.password !== this.user.confirmPassword) {
      await this.showToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    try {
      await this.authService.register({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      });

      await this.showToast('Usuario registrado correctamente', 'success');

      this.router.navigateByUrl('/tabs/libros', { replaceUrl: true });
    } catch (error) {
      console.error(error);
      await this.showToast('Error al registrar el usuario', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  goToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
