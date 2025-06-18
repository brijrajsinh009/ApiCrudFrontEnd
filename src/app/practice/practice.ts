import { Component, ElementRef, ViewChild } from '@angular/core';
import { PracticeState } from '../practice-state/practice-state';
import { PracticeState2 } from '../practice-state2/practice-state';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../form-field/form-field';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-practice',
  imports: [PracticeState, PracticeState2, MatButton, ReactiveFormsModule, FormField, CommonModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice {
  messageFromChild: string = 'no message';
  @ViewChild('childInstance') child!: PracticeState;
  count: number = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
    });
  }

  ngAfterViewInit() {
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
}
