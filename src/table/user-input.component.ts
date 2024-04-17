import {Component, computed, Input, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { UserInputModel} from './user-input-model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Dataaaaa} from "./DemoData";
import {TufinUiCommonModule} from "@tufin/angular-ui-common";
import {MatDialog} from "@angular/material/dialog";
import {UserInputConversationComponent} from "./user-input-conversation/user-input-conversation.component";

@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, DatePipe, MatInputModule, NgIf, NgForOf, MatButtonModule, TufinUiCommonModule],
})
export class UserInputComponent implements OnInit {

  protected readonly defDateFormat = 'mediumDate';

  @Input() data: UserInputModel[] = [... Dataaaaa];

  private dateTransformer = new DatePipe(`en-US`, null, {dateFormat: this.defDateFormat, timezone: "0"});
  private filterValues: any = {};

  displayedColumns: string[] = ['account', 'userVersion', 'category', 'userQuery', 'timestamp', 'userSentiment', 'sentimentScore'];
  dataSource: MatTableDataSource<UserInputModel>;
  filteredData = computed(() =>  this.dataSource ? this.dataSource.filteredData : this.data);
  showFilterRow: boolean = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  resolveSentiment(row: UserInputModel): string {
    return row.overallSentiment.sentimentType;
  }

  openConversation(row: UserInputModel) {
    this.dialog.open(UserInputConversationComponent, {data: row.conversation});
  }

  resolveSentimentScore(row: UserInputModel): number {
    const sentiment = this.resolveSentiment(row).toLowerCase();
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
        case 'timestamp': return this.compare(new Date(a.timestamp), new Date(b.timestamp), isAsc);
        default: return this.compare(a[sort.active], b[sort.active], isAsc);
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

    this.dataSource.filterPredicate = (data: UserInputModel, filter: string) => {
      for (let key of keys) {
        const filterValue = this.filterValues[key];
        if (filterValue.length === 0 ) continue;

        let cellValue = data[key];
        if (key === 'timestamp') {
          cellValue = this.dateTransformer.transform(cellValue);
        }

        if (! cellValue.toLowerCase().includes(filterValue)) {
          return false;
        }
      }
      return true;
    }

    this.dataSource.filter = 'aaaaaaaaaaaaaaaaa';//filterValue.trim().toLowerCase();
  }

  toggleFilterRow() {
    this.showFilterRow = !this.showFilterRow;
  }

  clearFilterRow() {
    this.showFilterRow = false;
    this.dataSource.filter = null;
    this.filterValues = {};
  }

}
