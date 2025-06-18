import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.html',
  imports: [ReactiveFormsModule,CommonModule],
  styleUrls: ['./form-field.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormField),
      multi: true,
    },
  ],
})
export class FormField implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validators: any[] = [];

  formControl = new FormControl('');

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    if (this.required) {
      this.validators.push(Validators.required);
    }
    this.formControl.setValidators(this.validators);
    if (this.disabled) {
      this.formControl.disable();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  // Handle blur for marking as touched
  onBlur(): void {
    this.onTouched();
  }
}