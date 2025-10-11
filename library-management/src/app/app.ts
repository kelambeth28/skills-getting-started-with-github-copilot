import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookForm } from './components/book-form/book-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookList, BookForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(BookList) bookList!: BookList;
  protected readonly title = signal('Library Management System');

  onBookAdded(): void {
    // Reload the book list when a new book is added
    if (this.bookList) {
      this.bookList.loadBooks();
    }
  }
}
