import { Component, OnInit } from '@angular/core';
import { Book, BookViewModel } from '../services/book';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  books: BookViewModel[] = [];
  errorMessage: string | null = null;

  constructor(private bookService: Book, private router: Router) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => this.errorMessage = 'Error loading books'
    });
  }

  onDeleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.bookService.getAllBooks().subscribe({
            next: (data) => this.books = data,
            error: (err) => this.errorMessage = 'Error loading books after delete'
          });
        } else {
          alert('Delete failed: ' + response.message);
        }
      },
      error: (err) => {
        alert('Server error: ' + err.message);
      }
    });
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }
}