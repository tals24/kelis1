import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AHelp, DataValMarkerSize, Interaction} from "../charts.models";

@Component({
  selector: 'app-canvas',
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
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnChanges {

  private monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  chartOptions1= {}
  private dataValMarkerSize: DataValMarkerSize[] =[]
  @Input() interactions: Array<Interaction> = [];
  constructor(private http: HttpClient) {
    // this.extracted1();
  }

  ngOnChanges({interactions}: SimpleChanges) {

    // if (interactions && interactions.currentValue !== interactions.previousValue) {
      this.interactions = [... interactions.currentValue];

      console.log("canvas: " + Object.keys(this.interactions).length)
      const myMap = new Map<string, AHelp>([
        ["January", {'count': 0, sum: 0}],
        ["February", {'count': 0, sum: 0}],
        ["March", {'count': 0, sum: 0}],
        ["April", {'count': 0, sum: 0}],
        ["May", {'count': 0, sum: 0}],
        ["June", {'count': 0, sum: 0}],
        ["July", {'count': 0, sum: 0}],
        ["August", {'count': 0, sum: 0}],
        ["September", {'count': 0, sum: 0}],
        ["October", {'count': 0, sum: 0}],
        ["November", {'count': 0, sum: 0}],
        ["December", {'count': 0, sum: 0}]
      ]);

      // this.http.get<Interaction[]>('http://ec2-52-205-250-126.compute-1.amazonaws.com:8080/interaction/all').subscribe((data: Interaction[]): void => {
      //   // console.log(data)
      //   this.interactions = data;
      this.interactions.forEach(entry => {
        // @ts-ignore
        let key = this.monthNames[new Date(entry.timestamp * 1000).getMonth()]
        // console.log("key     ", key)
        let me = myMap.get(key)
        let overallSentiment;
        if (entry.overallSentiment.sentimentType === "POSITIVE") {
          overallSentiment = +entry.overallSentiment.sentimentConfidence.positive;
        } else if (entry.overallSentiment.sentimentType === "NEGATIVE") {
          overallSentiment = -entry.overallSentiment.sentimentConfidence.negative;
        }
        // @ts-ignore
        myMap.set(key, {count: me?.count + 1, sum: overallSentiment});

      });

      this.dataValMarkerSize = [];
      myMap.forEach((value: AHelp, key: string) => {
        this.dataValMarkerSize.push({label: key, markerSize: (value.count) , y: (value.sum / value.count), })
      });
      // console.log('this.dataValMarkerSize', this.dataValMarkerSize)
      this.chartOptions1 = {
        width: 620,
        axisX: {
          interval: 1
        },


        title: {
          text: "Sentiment analysis per month"
        },  axisY:{
          minimum: -1,
          maximum: 1



        },
        data: [{
          toolTipContent: "Interactions: {markerSize} </br> Sentiment: {y} ",
          animationEnabled: true,
          markerType: "circle",  //"circle", "square", "cross", "none"
          type: "line",
          showInLegend: true,
          dataPoints: this.dataValMarkerSize
        }]
      };
      // });
    }

  // }
}


