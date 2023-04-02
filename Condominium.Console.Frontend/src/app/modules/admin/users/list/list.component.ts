import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from '../user.service';
import { ReplaySubject, takeUntil, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'app/interfaces';
import { translateRole } from 'app/utils';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

  private _unsubscribeAll: ReplaySubject<number> = new ReplaySubject(1);

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  public users$: Observable<User[]>;
  public users: User[] = [];
  public flashMessage: 'success' | 'error' | null = null;
  public loading: boolean;
  public pageSize: number = 0;
  public page: number = 1;

  constructor(private _userService: UserService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this._userService.getUsers({ roleId: 0, page: 1, pageSize: 10 }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.users$ = this._userService.users$;
      this.users = res.users;
      this.page = res.page;

      this.loading = false
      this._changeDetectorRef.markForCheck();
    });
  }

  translateRole(role: number): string {
    return translateRole(role);
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      console.log('OK');
      
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }
}
