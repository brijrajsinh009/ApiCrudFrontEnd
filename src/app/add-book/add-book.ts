import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../services/book';
import { BookViewModel } from '../models/model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  constructor(private bookService: Book, private router: Router) { }
  bookForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required,Validators.min(1),
      Validators.max(999)])
  });

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      const formValue = this.bookForm.value;
      const credentials: BookViewModel = {
        id: 0,
        name: formValue.name || '' ,
        author: formValue.author || '',
        price: formValue.price || 0 
      };
      this.bookService.addBook(credentials).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Book added with ID: ' + res.data);
            console.log("ADDED");
            this.router.navigate(['/dashboard']); 
          } else {
            alert('Failed: ' + res.message);
          }
        },
        error: (err) => {
          alert('Server error: ' + err.message);
        }
      });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}

