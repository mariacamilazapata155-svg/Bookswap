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
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
  IonChip,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, image, close } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  standalone: true,
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonList,
    IonChip,
    IonIcon,
    CommonModule,
    FormsModule
  ],
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
  ) {
    addIcons({
      add,
      image,
      close
    });
  }

  ionViewWillEnter() {
    this.librosIntercambiados = this.bookService.getIntercambios();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showToast('⚠️ Por favor selecciona una imagen válida', 'warning');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.showToast('⚠️ La imagen es muy grande (máx 5MB)', 'warning');
        return;
      }

      this.selectedFileName = file.name;
      const reader = new FileReader();
      
      reader.onload = () => {
        this.intercambio.foto = reader.result as string;
        this.showToast('✅ Imagen cargada correctamente', 'success');
      };
      
      reader.onerror = () => {
        this.showToast('❌ Error al cargar la imagen', 'danger');
      };
      
      reader.readAsDataURL(file);
    }
  }

  async publicar() {
    const { titulo, autor, categoria, estado } = this.intercambio;

    if (!titulo || !autor || !categoria || !estado) {
      await this.showToast('Completa todos los campos antes de publicar ⚠️', 'warning');
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
      photo: this.intercambio.foto || 'assets/default-book.jpg',
      intercambioEstado: 'Pendiente'
    };

    await this.bookService.addBook(nuevoLibro);
    await this.showToast('Libro agregado a tus libros 📚', 'success');

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
    await this.showToast(`Estado actualizado a "${nuevoEstado}" ✅`, 'tertiary');
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}