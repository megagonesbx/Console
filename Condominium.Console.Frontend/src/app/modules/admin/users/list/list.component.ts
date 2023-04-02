import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from '../user.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit, OnDestroy {

  private _unSubscribeAll: ReplaySubject<number> = new ReplaySubject(1);

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers({ roleId: 0, page: 1, pageSize: 10 }).pipe(takeUntil(this._unSubscribeAll)).subscribe(res => {

      if (res) {
        console.log(res.users);
      }

    });
  }

  ngOnDestroy(): void {
    this._unSubscribeAll.next(1);
    this._unSubscribeAll.complete();
    console.log('DESTROY');
  }
}
