import { Component } from '@angular/core';
import {LexComponent} from "../lex/lex.component";

@Component({
  selector: 'app-tabs',
  standalone: true,
    imports: [
        LexComponent
    ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
