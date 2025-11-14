import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status?: string;
  photo?: string;
}

export interface Intercambio extends Book {
  intercambioEstado: 'Pendiente' | 'Aceptado' | 'Rechazado' | 'Completado';
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  libros: any[] = [];
  private _storage: Storage | null = null;
  private books: Book[] = [];
  private intercambios: Intercambio[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    const savedBooks = await this._storage.get('books');
    const savedIntercambios = await this._storage.get('intercambios');

    if (savedBooks) this.books = savedBooks;
    if (savedIntercambios) this.intercambios = savedIntercambios;
  }

  getBooks() {
    return this.books;
  }

  async addBook(book: Book) {
    book.id = new Date().getTime();
    this.books.push(book);
    await this._storage?.set('books', this.books);
  }

  async deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
    await this._storage?.set('books', this.books);
  }

  async updateBook(id: number, updatedData: Partial<Book>) {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...updatedData };
      await this._storage?.set('books', this.books);
    }
  }

  getIntercambios() {
    return this.intercambios;
  }

  async addIntercambio(libro: Book) {
    const existe = this.intercambios.some(i => i.id === libro.id);
    if (!existe) {
      const nuevoIntercambio: Intercambio = {
        ...libro,
        intercambioEstado: 'Pendiente'
      };
      this.intercambios.unshift(nuevoIntercambio);
      await this._storage?.set('intercambios', this.intercambios);
    }
  }

  async updateIntercambio(libroActualizado: Intercambio) {
    const index = this.intercambios.findIndex(l => l.id === libroActualizado.id);
    if (index !== -1) {
      this.intercambios[index] = libroActualizado;
      await this._storage?.set('intercambios', this.intercambios);
    }
  }

  async removeIntercambio(id: number) {
    this.intercambios = this.intercambios.filter(i => i.id !== id);
    await this._storage?.set('intercambios', this.intercambios);
  }

  getBookById(id: number) {
  if (id == null) return null;

  if ((this as any).books && Array.isArray((this as any).books)) {
    const found = (this as any).books.find((b: any) => Number(b.id) === Number(id));
    if (found) return found;
  }
  if ((this as any).libros && Array.isArray((this as any).libros)) {
    const found = (this as any).libros.find((b: any) => Number(b.id) === Number(id));
    if (found) return found;
  }

  const mis = JSON.parse(localStorage.getItem('misLibros') || '[]');
  const foundMis = mis.find((b: any) => Number(b.id) === Number(id));
  if (foundMis) return foundMis;

  if (typeof this.getIntercambios === 'function') {
    const inter = this.getIntercambios() || [];
    const foundInter = inter.find((b: any) => Number(b.id) === Number(id));
    if (foundInter) return foundInter;
  } else {
    const storedInt = JSON.parse(localStorage.getItem('intercambios') || '[]');
    const foundStoredInt = storedInt.find((b: any) => Number(b.id) === Number(id));
    if (foundStoredInt) return foundStoredInt;
  }

  return null;
}

}
