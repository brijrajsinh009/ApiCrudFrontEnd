import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    HttpClientModule,
    
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected title = 'ApiCrudFrontEnd';
}

