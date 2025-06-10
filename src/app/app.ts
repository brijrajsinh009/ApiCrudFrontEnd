import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';

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

  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = ((event.url !== '/login') && (event.url !== '/register'));
    });
  }

  @ViewChild('drawer') drawer!: MatSidenav;

  logOut() {
    // const confirmed = confirm('Are you sure you want to log out?');
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: { message: 'Are you sure you want to log out?', btn: 'log out' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        document.cookie = 'JwtToken' + '=; Max-Age=0; path=/;';
        document.cookie = 'RefreshToken' + '=; Max-Age=0; path=/;';
        this.router.navigate(['/login']);
      }
    });

    // if (confirmed) {
    //   document.cookie = 'JwtToken' + '=; Max-Age=0; path=/;';
    //   document.cookie = 'RefreshToken' + '=; Max-Age=0; path=/;';
    //   this.router.navigate(['/login']);
    // }
  }


}


