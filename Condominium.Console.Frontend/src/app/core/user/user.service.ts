import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    public _menu: ReplaySubject<FuseNavigationItem[]> = new ReplaySubject<FuseNavigationItem[]>(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    set menuStorage(menu: FuseNavigationItem[]) {
        localStorage.setItem('menu', JSON.stringify(menu));
    }

    get menuStorage$() {
        return JSON.parse(localStorage.getItem('menu'));
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Setter & getter for menu
     */
    set menu(value: FuseNavigationItem[]) {
        this._menu.next(value);
    }

    loadMenu() {
        const menu = this.menuStorage$ || [];
        this._menu.next(menu);
        return this._menu.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
