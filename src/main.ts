import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from "@sentry/angular";
Sentry.init({
  dsn: "https://38d7f9f056ff7bcf3bab2f1cac36e2e8@o4507290536181760.ingest.de.sentry.io/4507290539720784",
  integrations: [],
});
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
