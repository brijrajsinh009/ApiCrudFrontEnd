import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
import { selectCounter } from '../counter.selectors';
import { AppState } from '../counter.selectors';
import { CommonModule } from '@angular/common';
import { Book } from '../services/book';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-practice-state2',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './practice-state.html',
  styleUrls: ['./practice-state.css']
})
export class PracticeState2 {
  counter2$: Observable<number>;

  constructor(private store: Store<AppState>, private book: Book) {
    this.counter2$ = this.store.select("counter");
  }
  
  send(): void {
    this.book.sendMessage('Hello from Child B!');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}


