import { Component, OnInit } from '@angular/core';
import { Book } from '../services/book';
import { BookViewModel } from '../models/model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { delay, Observable, of, Subject } from 'rxjs';
import { CustomHighlight } from '../custom-highlight';
import { CustomPipePipe } from '../custom-pipe-pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, CustomHighlight,CustomPipePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  //obj: Observable<number | string>; //for observable practice
  subject: Subject<number | string>;
  anotherObservable: Observable<string> = of('First', 'Second', 'Third').pipe(
    delay(3000)
  );

  apiUrl = environment.apiBaseServerUrl;

  books: BookViewModel[] = [];
  errorMessage: string | null = null;

  constructor(private bookService: Book, private router: Router, private dialog: MatDialog) {
    //for observable practice
    // this.obj = new Observable<number | string>((subscriber) => {
    //   console.log('Observable started');

    //   subscriber.next(42);    
    //   subscriber.next(100);  
    //   subscriber.next(200); 

    //   setTimeout(() => {
    //     subscriber.next(300);  
    //     subscriber.complete(); 
    //   }, 3000);
    // });
    this.subject = new Subject<number | string>();
  }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => this.errorMessage = 'Error loading books'
    });
    //for observable practice
    // setTimeout(() => {
    //   this.obj.subscribe({
    //     next: (value: number | string) => {
    //       console.log('Received:', value); 
    //     },
    //     complete: () => {
    //       console.log('Observable completed');
    //     }
    //   });
    // }, 3000);
    // setTimeout(() => {
    //   this.obj.subscribe({
    //     next: (value: number | string) => {
    //       console.log('Received:', value); 
    //     },
    //     complete: () => {
    //       console.log('Observable completed');
    //     }
    //   });
    // }, 6000);
    this.subject.subscribe(value => {
      console.log('Subscriber 1:', value);
    });
    this.subject.next(10);
    this.subject.next(20);
    this.subject.subscribe(value => {
      console.log('Subscriber 2:', value);
    });
    this.anotherObservable.subscribe(this.subject);

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



  // subscribeToObservable() {
  //   // Subscribe to the observable
  //   this.obj.subscribe({
  //     next: (value: number | string) => console.log(value),   // Logs each emitted value
  //     complete: () => console.log('Completed')  // Logs when the observable completes
  //   });
  // }


}