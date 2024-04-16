import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";

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
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {

  chartOptions1= {}
  private dataValMarkerSize: DataValMarkerSize[] =[]
  interactions: Array<Interaction> = [];
  constructor(private http: HttpClient) {
    this.extracted1();
  }

  private extracted1() {
    this.http.get<Interaction[]>('http://ec2-52-205-250-126.compute-1.amazonaws.com:8080/interaction/all').subscribe((data: Interaction[]): void => {
      // console.log(data)
      this.interactions = data;
      const myMap = new Map<string, AHelp>([
        ["January",  {'count':0, sum:  0}],
        ["February", {'count':0, sum:  0}],
        ["March", {'count':0, sum:  0}],
        ["April", {'count':0, sum:  0}],
        ["May", {'count':0, sum:  0}],
        ["June", {'count':0, sum:  0}],
        ["July", {'count':0, sum:  0}],
        ["August", {'count':0, sum:  0}],
        ["September", {'count':0, sum:  0}],
        ["October", {'count':0, sum:  0}],
        ["November", {'count':0, sum:  0}],
        ["December",{'count':0, sum:  0}]
      ]);

      const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      this.interactions.forEach(entry => {
        // @ts-ignore
        let key = monthNames[new Date(entry.timestamp * 1000).getMonth()]
        console.log("key     ",key)
        let me = myMap.get(key)
        let overallSentiment;
        if (entry.overallSentiment.sentimentType === "POSITIVE" || entry.overallSentiment.sentimentType == "NEUTRAL") {
          overallSentiment = +entry.overallSentiment.sentimentConfidence.positive;
        } else {
          overallSentiment = -entry.overallSentiment.sentimentConfidence.negative;
        }
        // @ts-ignore
        myMap.set(key, {count: me?.count + 1, sum: overallSentiment});

      });

      myMap.forEach((value: AHelp, key: string) => {
        this.dataValMarkerSize.push({label: key, markerSize: (value.count*2) , y: (value.sum / value.count)+0.3, })
      });
      console.log('this.dataValMarkerSize',this.dataValMarkerSize)
      this.chartOptions1 = {
        axisX:{
          interval: 1
        },

        title: {
          text: "Sentiment analysis per month"
        },
        data: [{
          toolTipContent: "Interactions: {markerSize} </br> Sentiment: {y} ",
          animationEnabled: true,
          markerType: "circle",  //"circle", "square", "cross", "none"
          type: "line",
          showInLegend: true,
          dataPoints:  this.dataValMarkerSize
        }]
      };
    });
  }


}

export interface AHelp {
  count: 0,
  sum:  0
}
//
export interface Interaction {
  account: string;
  userVersion: string;
  category: string;
  userQuery: string;
  timestamp: number;
  analyzedUserResponse: AnalyzedUserResponse[];
  overallSentiment: OverallSentiment;
}

export interface AnalyzedUserResponse {
  id: number;
  input: string;
  sentiment: Sentiment;
}

export interface Sentiment {
  sentimentType: string;
  sentimentConfidence: {
    positive: number;
    negative: number;
    neutral: number;
    mixed: number;
  };
}
export interface OverallSentiment {
  sentimentType: "NEGATIVE" | "NEUTRAL" |  "POSITIVE",
  sentimentConfidence: {
    positive: number,
    negative: number

  }
}
export interface DataVal{
  label: string,
  y: number,
}

export interface DataValMarkerSize{
  label: string,
  markerSize: number,
  y: number,
}

