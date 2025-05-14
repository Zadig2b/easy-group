import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptorProvider } from './core/jwt.interceptor';
import { errorInterceptorProvider } from './core/error.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    jwtInterceptorProvider,
    errorInterceptorProvider 
  ]
};
