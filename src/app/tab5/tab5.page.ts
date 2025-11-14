import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab5Page {

  notificaciones: any[] = [];
  mensajes: any[] = [];
  segment: string = 'mensajes';

  mostrarFormulario = false;

  nuevoMensaje = {
    destinatario: '',
    asunto: '',
    contenido: '',
    foto: '' 
  };

  constructor(
    private notifService: NotificationService,
    private location: Location,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.notificaciones = this.notifService.getNotificaciones();
    this.mensajes = this.notifService.getMensajes();
  }

  volver() {
    this.location.back();
  }

  toggleNuevoMensaje() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async enviarMensaje() {
    if (!this.nuevoMensaje.destinatario || !this.nuevoMensaje.asunto || !this.nuevoMensaje.contenido) {
      const toast = await this.toastCtrl.create({
        message: 'Completa todos los campos para enviar el mensaje.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const mensajeEnviado = {
      ...this.nuevoMensaje,
      fecha: new Date()
    };

    this.notifService.agregarMensaje(mensajeEnviado);

    const toast = await this.toastCtrl.create({
      message: 'Mensaje enviado correctamente 📩',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    this.nuevoMensaje = { destinatario: '', asunto: '', contenido: '', foto: '' };
    this.mostrarFormulario = false;
    this.mensajes = this.notifService.getMensajes();
  }

  abrirMensaje(m: any) {
    console.log("Abrir mensaje →", m);
  }

  abrirNotificacion(n: any) {
    console.log("Abrir notificación →", n);
  }
}
