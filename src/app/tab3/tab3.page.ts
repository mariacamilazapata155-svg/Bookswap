import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  standalone: true,
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3Page {

  librosIntercambiados: any[] = [];
  mostrarFormulario = false;

  intercambio = {
    titulo: '',
    autor: '',
    categoria: '',
    estado: '',
    descripcion: '',
    ubicacion: '',
    foto: ''
  };

  selectedFileName: string = '';

  constructor(
    private toastCtrl: ToastController,
    private bookService: BookService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.librosIntercambiados = this.bookService.getIntercambios();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.intercambio.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async publicar() {
    const { titulo, autor, categoria, estado } = this.intercambio;

    if (!titulo || !autor || !categoria || !estado) {
      const toast = await this.toastCtrl.create({
        message: 'Completa todos los campos antes de publicar ⚠️',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const nuevoLibro = {
      id: Date.now(),
      title: titulo,
      author: autor,
      category: categoria,
      status: estado,
      description: this.intercambio.descripcion,
      location: this.intercambio.ubicacion,
      photo: this.intercambio.foto || '',
      intercambioEstado: 'Pendiente'
    };

    await this.bookService.addBook(nuevoLibro);

    const toast = await this.toastCtrl.create({
      message: 'Libro agregado a tus libros 📚',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    this.intercambio = {
      titulo: '',
      autor: '',
      categoria: '',
      estado: '',
      descripcion: '',
      ubicacion: '',
      foto: ''
    };

    this.selectedFileName = '';
    this.mostrarFormulario = false;
  }

  async cambiarEstado(libro: any, nuevoEstado: string) {
    libro.intercambioEstado = nuevoEstado;
    this.bookService.updateIntercambio(libro);

    const toast = await this.toastCtrl.create({
      message: `Estado actualizado a "${nuevoEstado}" ✅`,
      duration: 1500,
      color: 'tertiary'
    });
    await toast.present();
  }
}
