import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// ⬇️ importer ta config globale
import { GLOBAL_CONFIG, globalConfig } from './app/config/global.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ...appConfig.providers,

    // ⬇️ injection globale de ta config métier
    { provide: GLOBAL_CONFIG, useValue: globalConfig }
  ]
}).catch((err) => console.error(err));
