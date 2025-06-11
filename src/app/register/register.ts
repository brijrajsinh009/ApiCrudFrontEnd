import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LoginDetails, UserRegistration } from '../models/model';
import { AuthService } from '../services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    RouterModule,
    MatIcon,
    MatFormFieldModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  constructor(private authService: AuthService, private router: Router) { }

  hide = true;
  hideCP = true;
  registerForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.maxLength(75)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[789]\\d{9}$')]),
    password: new FormControl('', [Validators.required, this.noSpaceValidator]),
    confirmPassword: new FormControl('', [Validators.required, this.noSpaceValidator]),
    image: new FormControl(File)
  }, { validators: this.confirmPasswordValidator() });

  noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    return /\s/.test(control.value) ? { noSpace: true } : null;
  }

  confirmPasswordValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        group.get('confirmPassword')?.setErrors({ passwordsDontMatch: true });
        return { passwordsDontMatch: true };
      }
      const errors = group.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['passwordsDontMatch'];
        if (Object.keys(errors).length === 0) {
          group.get('confirmPassword')?.setErrors(null);
        } else {
          group.get('confirmPassword')?.setErrors(errors);
        }
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const controls = ['userEmail', 'name', 'phoneNumber', 'password', 'confirmPassword'];
      controls.forEach(controlName => {
        const value = this.registerForm.get(controlName)?.value;
        formData.append(controlName, value ?? '');
      });
      if (this.image) {
        formData.append('image', this.image);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.authService.registration(formData).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Registration Done. Id : ' + res.data);
            this.router.navigate(['/login']);
          }
          else {
            alert('Registration failed: ' + res.message);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          let message = 'An unknown error occurred';
          if (error.error instanceof ErrorEvent) {
            message = `Client error: ${error.error.message}`;
          } else {
            message = `Registration Failed : ${error.error?.message || error.message}`;
          }
          alert(message);
        }
      });
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
