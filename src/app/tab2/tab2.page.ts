import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book';
import { ChatPage } from '../chat/chat.page';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2Page {
  book: any = null;
  lastIdTried: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private notifService: NotificationService
  ) {}

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;
      this.lastIdTried = id;
      console.log('Tab2 - paramMap id:', id);

      if (id) {
        this.book = this.bookService.getBookById(id);
        console.log('Tab2 - book obtenido:', this.book);

        if (!this.book) {
          const navigation = this.router.getCurrentNavigation();
          const navBook = navigation?.extras?.state?.['book'];
          if (navBook && Number(navBook.id) === Number(id)) {
            this.book = navBook;
            console.log('Tab2 - book recuperado desde navigation.state:', this.book);
          }
        }

        if (!this.book) {
          console.warn('Tab2: no se encontró libro con id', id);
        }
      } else {
        this.book = null;
        console.warn('Tab2: id nulo en params');
      }
    });
  }

  async solicitarIntercambio(book: any) {
    if (!book) return;

    this.bookService.addIntercambio(book);

    this.notifService.agregarNotificacion({
    mensaje: `Has solicitado un intercambio por "${book.title}"`,
    fecha: new Date(),
    tipo: 'intercambio'
  });

    const toast = await this.toastCtrl.create({
      message: `Solicitud enviada para "${book.title}" 📬`,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }

  async enviarMensaje(book: any) {
    if (!book) return;

    this.notifService.addNotificacion({
      tipo: 'mensaje',
      mensaje: `Enviaste un mensaje al dueño de "${book.title}"`,
      libro: book,
    });

    const modal = await this.modalCtrl.create({
      component: ChatPage,
      componentProps: { destinatario: book.author },
    });
    await modal.present();
  }
}
