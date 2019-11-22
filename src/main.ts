import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// load the app-config file before bootstrapping the angular app
(async () => {
  try {
    const response = await fetch('assets/app-config.json');
    if (response.status === 404) throw new Error('Could not fetch app-config');
    window.AppConfig = await response.json();
    if (environment.production) enableProdMode();
    await platformBrowserDynamic().bootstrapModule(AppModule);
  } catch (e) {
    if (!e) e = new Error('Unexpected error');
    document.body.innerHTML = e.message;
  }
})();
