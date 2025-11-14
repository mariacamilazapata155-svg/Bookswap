import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage {
  nuevo = {
    destinatario: '',
    asunto: '',
    mensaje: ''
  };

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  enviar() {
    if (!this.nuevo.destinatario.trim() || !this.nuevo.mensaje.trim()) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    this.modalCtrl.dismiss(this.nuevo, 'enviar');
  }
}
