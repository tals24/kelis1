import {Component, importProvidersFrom} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {ChartsComponent} from "./charts/charts.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LexComponent} from "./lex/lex.component";
import {TabsComponent} from "./tabs/tabs.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-tabs></app-tabs>
  `,
  imports: [
    ChartsComponent,
    LexComponent,
    TabsComponent,
  ]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
