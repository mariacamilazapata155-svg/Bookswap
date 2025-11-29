import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonAvatar,
  IonText,
  AlertController, 
  ToastController 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../services/book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, create, trash, bookOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonAvatar,
    IonText,
    CommonModule, 
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Ficción', 'Ciencia', 'Historia', 'Filosofía', 'Tecnología', 'Arte', 'Novela'];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private bookService: BookService,
    private router: Router
  ) {
    addIcons({
      add,
      create,
      trash,
      'book-outline': bookOutline
    });
  }

  ionViewWillEnter() {
    this.loadBooks();
  }

  private loadBooks() {
    const serviceBooks = this.bookService.getBooks();
    const publishedBooks = JSON.parse(localStorage.getItem('misLibros') || '[]');
    const combinedBooks = [...serviceBooks];

    publishedBooks.forEach((pb: any) => {
      const exists = combinedBooks.some(b =>
        b.title === pb.title && b.author === pb.author
      );
      if (!exists) {
        combinedBooks.push({
          id: Date.now(),
          title: pb.title,
          author: pb.author,
          category: pb.category || 'Sin categoría'
        });
      }
    });

    this.books = combinedBooks;
    this.filteredBooks = [...this.books];
  }

  filterBooks(event: any) {
    this.searchTerm = event.target.value?.toLowerCase() || '';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(this.searchTerm) ||
        book.author.toLowerCase().includes(this.searchTerm) ||
        book.category.toLowerCase().includes(this.searchTerm);

      const matchesCategory =
        !this.selectedCategory || book.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  async addBook() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Libro',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Título del libro' },
        { name: 'author', type: 'text', placeholder: 'Autor' },
        { name: 'category', type: 'text', placeholder: 'Categoría' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.title && data.author) {
              await this.bookService.addBook(data);
              this.loadBooks();
              this.showToast('Libro agregado ✅');
              return true;
            } else {
              this.showToast('⚠️ Completa todos los campos');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteBook(book: Book) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar el libro "${book.title}"?`,
      cssClass: 'delete-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.bookService.deleteBook(book.id);

            let publishedBooks = JSON.parse(localStorage.getItem('misLibros') || '[]');
            publishedBooks = publishedBooks.filter((pb: any) => pb.title !== book.title);
            localStorage.setItem('misLibros', JSON.stringify(publishedBooks));

            this.loadBooks();
            this.showToast('Libro eliminado correctamente');
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async editBook(book: Book) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Libro',
      inputs: [
        { name: 'title', type: 'text', value: book.title, placeholder: 'Título' },
        { name: 'author', type: 'text', value: book.author, placeholder: 'Autor' },
        { name: 'category', type: 'text', value: book.category, placeholder: 'Categoría' },
        { name: 'status', type: 'text', value: book.status, placeholder: 'Estado' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            await this.bookService.updateBook(book.id, data);
            this.loadBooks();
            this.showToast('Libro actualizado ✏️');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  verDetalles(book: any) {
    console.log('verDetalles -> enviando id:', book?.id);
    
    if (!book || !book.id) {
      this.showToast('⚠️ Error: Libro no válido');
      return;
    }
    
    this.router.navigate(['/tabs/detalles', book.id]);
  }
}