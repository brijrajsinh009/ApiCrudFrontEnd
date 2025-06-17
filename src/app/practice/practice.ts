import { Component, ElementRef, ViewChild } from '@angular/core';
import { PracticeState } from '../practice-state/practice-state';
import { PracticeState2 } from '../practice-state2/practice-state';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-practice',
  imports: [PracticeState, PracticeState2, MatButton],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice {
  messageFromChild: string = 'no message';
  @ViewChild('childInstance') child!: PracticeState;
  count: number = 1;

  ngAfterViewInit() {
  }

  handleNotification(message: string) {
    this.messageFromChild = message;
  }

  manipulateChild() {
    this.child.changeButtonText(`Maniputed by parent! ${this.count}`);
    this.count++;
  }
}
