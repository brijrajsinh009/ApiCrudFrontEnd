import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
import { selectCounter } from '../counter.selectors';
import { AppState } from '../counter.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice-state',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './practice-state.html',
  styleUrls: ['./practice-state.css']
})
export class PracticeState {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select("counter"); 
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


