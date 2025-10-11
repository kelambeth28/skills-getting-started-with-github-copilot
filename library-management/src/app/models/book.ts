export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  availableCopies: number;
  totalCopies: number;
}
