import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab4Page {
  userName: string = 'Usuario';
  userEmail: string = 'usuario@correo.com';
  userPassword: string = '';
  userPhoto: string | null = null;

  isEditOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const user = await this.authService.getUser();

    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPhoto = user.photo || null;
    }
  }

  cambiarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          this.userPhoto = reader.result as string;

          await this.authService.updateUser({
            name: this.userName,
            email: this.userEmail,
            photo: this.userPhoto
          });
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  abrirEditarPerfil() {
    this.isEditOpen = true;
  }

  cerrarEditarPerfil() {
    this.isEditOpen = false;
  }

  async guardarPerfil() {
    await this.authService.updateUser({
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword || undefined,
      photo: this.userPhoto
    });

    this.userPassword = '';

    this.isEditOpen = false;
  }

  verLibros() {
    this.router.navigateByUrl('/tabs/libros');
  }

  verHistorial() {
    this.router.navigateByUrl('/tabs/intercambios');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
