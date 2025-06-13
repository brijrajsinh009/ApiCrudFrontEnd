import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthLoginInterceptor } from './app/auth-login-interceptor';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/counter.reducer';  // Import your reducer

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([AuthLoginInterceptor])),
    provideRouter(routes),
    provideStore({ counter: counterReducer }),
  ]
});




