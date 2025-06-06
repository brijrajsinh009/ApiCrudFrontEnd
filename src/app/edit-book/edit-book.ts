import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../services/book';
import { BookViewModel } from '../models/model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.css']
})
export class EditBook implements OnInit {
  bookForm!: FormGroup;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: Book,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    this.bookForm = this.fb.group({
      id: [this.bookId],
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: [0, [Validators.required,
      Validators.min(1),
      Validators.max(999)
      ]]
    });

    this.loadBookData(this.bookId);
  }

  loadBookData(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.success) {
          this.bookForm.patchValue(res.data);
        } else {
          alert('Failed to load book: ' + res.message);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        alert('Server error: ' + err.message);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const updatedBook: BookViewModel = {
      id: this.bookId,
      ...this.bookForm.value
    };

    this.bookService.updateBook(updatedBook).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Book updated successfully');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Update failed: ' + res.message);
        }
      },
      error: (err: any) => alert('Server error: ' + err.message)
    });
  }
}

