import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PracticeState } from '../practice-state/practice-state';
import { PracticeState2 } from '../practice-state2/practice-state';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../form-field/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

declare const puter: any;

@Component({
  selector: 'app-practice',
  imports: [PracticeState, PracticeState2, MatButton, ReactiveFormsModule, FormField, CommonModule, RouterModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice {
  messageFromChild: string = 'no message';
  ai: any = 'no message';
  @ViewChild('childInstance') child!: PracticeState;
  count: number = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
    });
  }

  handleNotification(message: string) {
    this.messageFromChild = message;
  }

  manipulateChild() {
    this.child.changeButtonText(`Maniputed by parent! ${this.count}`);
    this.count++;
  }

  form: FormGroup;
  minLengthValidator = Validators.minLength(3);
  emailValidator = Validators.email;

  onSubmit() {
    console.log(this.form.value);
  }

  // onAI()
  // {
  //   puter.ai.chat("What are the benefits of exercise?")
  //   .then(response => {
  //       this.ai=response;
  //   });
  // }
}
