import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(private router: Router,
    private toastController: ToastController
  ) {}

  async sendResetLink() {
    if (!this.email) {
      await this.showToast('Por favor ingresa tu correo electrónico', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      await this.showToast('Por favor ingresa un correo válido', 'warning');
      return;
    }

    try {
      await this.showToast('Se ha enviado un enlace a tu correo', 'success');
      
      setTimeout(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }, 2000);
    } catch (error) {
      console.error(error);
      await this.showToast('Error al enviar el enlace', 'danger');
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

  volverLogin() {
    this.router.navigateByUrl('/login');
  }
}
