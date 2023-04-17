import { Component, OnInit } from '@angular/core';
import { SpreadsheetService } from './spreadsheet.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  private _unsubscribeAll: ReplaySubject<any> = new ReplaySubject();

  constructor(private _spreadsheetService: SpreadsheetService) { }

  ngOnInit(): void {
  }
};