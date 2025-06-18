import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
import { selectCounter } from '../counter.selectors';
import { AppState } from '../counter.selectors';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Book } from '../services/book';

@Component({
  selector: 'app-practice-state',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './practice-state.html',
  styleUrls: ['./practice-state.css']
})
export class PracticeState {
  @Input() messageError!: string;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter();
  counter$: Observable<number>;
  messageSibling: string = 'No Message!'
  private subscription!: Subscription;

  @ViewChild('btnPress') btnRef!: ElementRef;

  changeButtonText(newText: string) {
    this.btnRef.nativeElement.innerText = newText;
  }

  constructor(private store: Store<AppState>, private book: Book) {
    this.counter$ = this.store.select("counter");
  }

  ngOnInit(): void {
    this.subscription = this.book.message$.subscribe(
      (message: any) => {
        this.messageSibling = message;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  sendData() {
    this.notifyParent.emit('Hello Parent!');
  }

  
}


