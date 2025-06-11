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
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-add-book',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatIcon],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})

export class AddBook {
  constructor(private bookService: Book, private router: Router) { }
  bookForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.maxLength(75)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(75)]),
    price: new FormControl(null, [Validators.required, Validators.min(1),
    Validators.max(999)])
  });

  onSubmit() {
    if (this.bookForm.valid) {
      // console.log(this.bookForm.value);
      // const formValue = this.bookForm.value;
      // const credentials: BookViewModel = {
      //   id: 0,
      //   name: formValue.name || '',
      //   author: formValue.author || '',
      //   price: formValue.price || 0
      // };
      const formData = new FormData();
      const controls = ['name', 'author', 'price'];
      controls.forEach(controlName => {
        const value = this.bookForm.get(controlName)?.value;
        formData.append(controlName, value ?? '');
      });
      if (this.image) {
        formData.append('imagefile', this.image);
      }
      formData.append('id', '0');
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.bookService.addBook(formData).subscribe({
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

  fileName: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  image: File | undefined = undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

