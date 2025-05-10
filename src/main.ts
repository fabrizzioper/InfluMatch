import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { SharedModule } from './app/shared/shared.module';
import { CoreModule } from './app/core/core.module';
import { BrowserModule } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      BrowserModule,
      CoreModule, // HttpClientModule, TranslateModule, ThemeService…
      SharedModule // CommonModule, RouterModule, Material, TranslatePipe…
    ),
  ],
}).catch((err) => console.error(err));
