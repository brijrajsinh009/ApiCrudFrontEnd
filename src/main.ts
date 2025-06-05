
  import { bootstrapApplication } from '@angular/platform-browser';
  import { appConfig } from './app/app.config';
  import { App } from './app/app';
  import { routes } from './app/app.routes';
  import { provideHttpClient, HTTP_INTERCEPTORS , withInterceptors  } from '@angular/common/http';
  import { provideRouter } from '@angular/router';
  import { AuthLoginInterceptor } from './app/auth-login-interceptor';
  
  bootstrapApplication(App, {
    providers: [
      provideHttpClient(withInterceptors([AuthLoginInterceptor])),  
      provideRouter(routes),
    ]
  });
  
