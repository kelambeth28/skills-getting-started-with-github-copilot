import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books. Please ensure the backend service is running.';
        this.loading = false;
        console.error('Error loading books:', err);
      }
    });
  }

  borrowBook(id: number | undefined): void {
    if (!id) return;
    
    this.bookService.borrowBook(id).subscribe({
      next: () => {
        this.loadBooks(); // Reload to show updated available copies
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to borrow book');
        console.error('Error borrowing book:', err);
      }
    });
  }

  returnBook(id: number | undefined): void {
    if (!id) return;
    
    this.bookService.returnBook(id).subscribe({
      next: () => {
        this.loadBooks(); // Reload to show updated available copies
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to return book');
        console.error('Error returning book:', err);
      }
    });
  }

  deleteBook(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks(); // Reload the list
        },
        error: (err) => {
          alert('Failed to delete book');
          console.error('Error deleting book:', err);
        }
      });
    }
  }
}
