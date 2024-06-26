import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {CanvasComponent} from "./canvas/canvas.component";
import {MatButtonModule} from "@angular/material/button";
import {ColumnsComponent} from "./columns/columns.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Interaction} from "./charts.models";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [MatButtonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatGridTile, MatGridList, CanvasComponent, ColumnsComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {

  // @ts-ignore
  @Input() interactions: Interaction[];

  constructor(public dialog: MatDialog) {}

  openColumnsComponent(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ColumnsComponent, {
      width: '900px',
      height: '440px',
      minWidth:'900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

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


