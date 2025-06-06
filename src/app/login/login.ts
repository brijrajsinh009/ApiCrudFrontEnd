
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth';
import { LoginDetails } from '../models/model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ]
})

export class Login {
  loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.noSpaceValidator])
  });

  constructor(private authService: AuthService, private router: Router) { }

  noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    return /\s/.test(control.value) ? { noSpace: true } : null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginDetails = this.loginForm.value as LoginDetails;
      this.authService.login(credentials).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Login successful');
            console.log(res.data);
            document.cookie = `JwtToken=${encodeURIComponent((res.data[0]))}; path=/; max-age=${7 * 24 * 60 * 60}`;
            document.cookie = `RefreshToken=${encodeURIComponent((res.data[1]))}; path=/; max-age=${7 * 24 * 60 * 60}`;
            this.router.navigate(['/dashboard']);
          } else {
            alert('Login failed: ' + res.message);
          }
        },
        error: (err) => {
          alert(err.message);
        }
      });
    }
  }
}
