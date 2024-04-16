import { Component } from '@angular/core';
import {LexComponent} from "../lex/lex.component";
import {ChartsComponent} from "../charts/charts.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    LexComponent,
    ChartsComponent,
    MatTabGroup,
    MatTab,
    MatCardContent,
    MatCard
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
