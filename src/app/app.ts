import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Book Inventory';

  showHeader = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = event.url !== '/login';
    });
  }

  @ViewChild('drawer') drawer!: MatSidenav;

  logOut() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      document.cookie = 'JwtToken' + '=; Max-Age=0; path=/;';
      document.cookie = 'RefreshToken' + '=; Max-Age=0; path=/;';
      this.router.navigate(['/login']);
    }
  }


}


