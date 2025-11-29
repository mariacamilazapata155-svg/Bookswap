import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { camera, close, save, logOut, book, time } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonModal,
    IonButtons,
    IonIcon,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab4Page {
  userName: string = 'Usuario';
  userEmail: string = 'usuario@correo.com';
  userPassword: string = '';
  userPhoto: string | null = null;

  isEditOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      camera,
      close,
      save,
      'log-out': logOut,
      book,
      time
    });
  }

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