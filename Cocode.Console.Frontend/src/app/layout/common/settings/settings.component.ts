import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuggestionComponent } from 'app/modules/neighbor/suggestion/suggestion.component';
import { SuggestionService } from 'app/modules/neighbor/suggestion/suggestion.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _dialogRef: MatDialogRef<SuggestionComponent, any>;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private readonly _dialog: MatDialog,
        private readonly _service: SuggestionService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {
                // Store the config
                this.config = config;
            });

        this.onListenDialog();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout: string): void {
        // Clear the 'layout' query param to allow layout changes
        this._router
            .navigate([], {
                queryParams: {
                    layout: null,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                // Set the config
                this._fuseConfigService.config = { layout };
            });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void {
        this._fuseConfigService.config = { scheme };
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void {
        this._fuseConfigService.config = { theme };
    }

    public onAddSuggestion() {
        this._dialogRef = this._dialog.open(SuggestionComponent, {
            width: '500px',
        });
    }

    private onListenDialog() {
        this._service.onGetDialog
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this._dialogRef.close();
            });
    }
}
