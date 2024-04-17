import {Component, computed, Input, OnInit, signal, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
// import { Interaction} from './user-input-model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Dataaaaa} from "./DemoData";
// import {TufinUiCommonModule} from "@tufin/angular-ui-common";
import {MatDialog} from "@angular/material/dialog";
import {UserInputConversationComponent} from "./user-input-conversation/user-input-conversation.component";
import {HttpClient} from "@angular/common/http";
import {Interaction} from "../charts/charts.models";
import {ChartsComponent} from "../charts/charts.component";

@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, DatePipe, MatInputModule, NgIf, NgForOf, MatButtonModule, ChartsComponent],
})
export class UserInputComponent implements OnInit {

  protected readonly defDateFormat = 'mediumDate';

  @Input() data: Interaction[] = [];

  private dateTransformer = new DatePipe(`en-US`, null, {dateFormat: this.defDateFormat, timezone: "0"});
  private filterValues: any = {};

  displayedColumns: string[] = ['account', 'userVersion', 'category', 'userQuery', 'timestamp', 'userSentiment', 'sentimentScore'];
  // @ts-ignore
  dataSource: MatTableDataSource<Interaction>;
  filteredData = signal<Interaction[]>([]);
  showFilterRow: boolean = false;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.http.get<Interaction[]>('http://ec2-52-205-250-126.compute-1.amazonaws.com:8080/interaction/all').subscribe((data: Interaction[]): void => {
      this.data = [... data];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.filteredData.set(this.data);
    });
  }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.sort = this.sort;
  }

  resolveSentiment(row: Interaction): string {
    return row.overallSentiment.sentimentType;
  }

  openConversation(row: Interaction) {
    this.dialog.open(UserInputConversationComponent, {data: row.conversation});
  }

  resolveTimestamp(row: Interaction): number {
    return row.timestamp ? row.timestamp*1000 : 0;
  }

  resolveUserQuery(row: Interaction): string {
    const len = row.userQuery?.length || 0;
    if (len == 0) return '';
    if (len > 30) return row.userQuery.substring(0, 30) + "...";
    return row.userQuery;
  }

  resolveSentimentScore(row: Interaction): number {
    const sentiment = this.resolveSentiment(row).toLowerCase();
    // @ts-ignore
    return row.overallSentiment.sentimentConfidence[sentiment];
  }

  onSortChange(sort: Sort) {
    const data = this.dataSource.data.slice(); // Make a copy of the data array
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data; // If no sort or direction is set, return the original data
      return;
    }

    // Sort the data based on the active column and direction
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp': return this.compare(new Date(this.resolveTimestamp(a)), new Date(this.resolveTimestamp(b)), isAsc);
        default: // @ts-ignore
          return this.compare(a[sort.active], b[sort.active], isAsc);
      }
    });
  }

  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event, columnName: string) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.filterValues[columnName] = filterValue.trim().toLowerCase();
    const keys = Object.keys(this.filterValues);

    this.dataSource.filterPredicate = (data: Interaction, filter: string) => {
      for (let key of keys) {
        const filterValue = this.filterValues[key];
        if (filterValue.length === 0 ) continue;

        // @ts-ignore
        let cellValue = data[key];
        if (key === 'timestamp') {
          cellValue = this.dateTransformer.transform(this.resolveTimestamp(data));
        }

        if (! cellValue.toLowerCase().includes(filterValue)) {
          return false;
        }
      }
      return true;
    }

    this.dataSource.filter = 'aaaaaaaaaaaaaaaaa';//filterValue.trim().toLowerCase();
    this.filteredData.set(this.dataSource.filteredData);
  }

  toggleFilterRow() {
    this.showFilterRow = !this.showFilterRow;
  }

  clearFilterRow() {
    this.showFilterRow = false;
    // @ts-ignore
    this.dataSource.filter = null;
    this.filterValues = {};
    this.filteredData.set(this.data);
  }

}
