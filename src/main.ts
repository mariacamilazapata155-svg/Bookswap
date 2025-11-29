import { IonicStorageModule } from '@ionic/storage-angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from './app/services/auth.service';
import { StorageService } from './app/services/storage.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    StorageService,
    AuthService,
  ],
});
