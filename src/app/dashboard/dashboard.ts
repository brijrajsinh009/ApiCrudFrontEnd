import { Component, OnInit } from '@angular/core';
import { Book } from '../services/book';
import { BookViewModel } from '../models/model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  apiUrl = environment.apiBaseServerUrl;

  books: BookViewModel[] = [];
  errorMessage: string | null = null;

  constructor(private bookService: Book, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => this.errorMessage = 'Error loading books'
    });
  }

  onDeleteBook(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this book?', btn: 'delete' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
    });
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }
}