import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {ChartsComponent} from "./charts/charts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-charts></app-charts>
  `,
  imports: [
    ChartsComponent
  ]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
