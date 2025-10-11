import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm {
  @Output() bookAdded = new EventEmitter<void>();

  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    genre: '',
    availableCopies: 1,
    totalCopies: 1
  };

  submitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private bookService: BookService) {}

  onSubmit(): void {
    this.submitting = true;
    this.error = null;
    this.success = null;

    this.bookService.createBook(this.book).subscribe({
      next: (newBook) => {
        this.success = `Book "${newBook.title}" added successfully!`;
        this.submitting = false;
        this.resetForm();
        this.bookAdded.emit();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.success = null;
        }, 3000);
      },
      error: (err) => {
        this.error = 'Failed to add book. Please check all fields and try again.';
        this.submitting = false;
        console.error('Error creating book:', err);
      }
    });
  }

  resetForm(): void {
    this.book = {
      title: '',
      author: '',
      isbn: '',
      publishedYear: new Date().getFullYear(),
      genre: '',
      availableCopies: 1,
      totalCopies: 1
    };
  }
}
