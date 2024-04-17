// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-columns',
//   standalone: true,
//   imports: [],
//   templateUrl: './columns.component.html',
//   styleUrl: './columns.component.css'
// })
// export class ColumnsComponent {
//
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AHelp, DataVal, DataValMarkerSize, Interaction} from "../charts.models";

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    MatDialogContent,
    MatDialogActions
  ],providers:[HttpClientModule ],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css'
})
export class ColumnsComponent {
  chartOptions= {}
  private dataVals: DataVal[] =[]
  private dataValMarkerSize: DataValMarkerSize[] =[]
  interactions: Array<Interaction> = [];
  constructor(private http: HttpClient) {
    this.extracted();
  }

  private extracted() {
    this.http.get<Interaction[]>('http://ec2-52-205-250-126.compute-1.amazonaws.com:8080/interaction/all').subscribe((data: Interaction[]): void => {
      // console.log(data)
      this.interactions = data;
      let myMap = new Map<string, AHelp>();
      let categoryCounts = {};
      this.interactions.forEach(entry => {
        const category: string = entry.category.toLowerCase().replace("_", " ");
        if (!myMap.has(category)) {
          myMap.set(category, {count: 0, sum: 0});
        }
        let me = myMap.get(category)
        let overallSentiment;
        if (entry.overallSentiment.sentimentType === "POSITIVE") {
          overallSentiment = +entry.overallSentiment.sentimentConfidence.positive;
        } else if (entry.overallSentiment.sentimentType === "NEGATIVE"){
          overallSentiment = -entry.overallSentiment.sentimentConfidence.negative;
        }
        // @ts-ignore
        myMap.set(category, {count: me?.count + 1, sum: overallSentiment});

      });
      myMap.forEach((value: AHelp, key: string) => {
        this.dataVals.push({label: `${key} (${value.count})`, y: (value.sum / value.count)})
      });

      this.chartOptions = {
        width:620,
        animationEnabled: true,
        title: {
          text: "Sentiment analysis feature",

        },
        axisY:{
          minimum: -1,
          maximum: 1



        },
        data: [{
          type: "column",
          dataPoints: this.dataVals
        }]
      };
    });
  }


}


