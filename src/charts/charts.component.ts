import { Component } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {CanvasComponent} from "./canvas/canvas.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [MatButtonModule,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  constructor(public dialog: MatDialog) {}

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(CanvasLineComponent, {
  //     width: '900px',
  //     height: '440px',
  //     minWidth:'900px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  openDialogCanvasLine(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CanvasComponent, {
      width: '900px',
      height: '440px',
      minWidth:'900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


