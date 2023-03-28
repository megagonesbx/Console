import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'usuarios' },
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'usuarios', loadChildren: () => import('app/modules/admin/users/users.module').then(m => m.UsersModule) },
            { path: 'residentes', loadChildren: () => import('app/modules/admin/residents/residents.module').then(m => m.ResidentsModule) },
            { path: 'donaciones', loadChildren: () => import('app/modules/admin/donations/donations.module').then(m => m.DonationsModule) },
            { path: 'planilla', loadChildren: () => import('app/modules/admin/forms/forms.module').then(m => m.FormsModule) },
            { path: 'residentes-solventes', loadChildren: () => import('app/modules/admin/solvents/solvents.module').then(m => m.SolventsModule) },
        ]
    },
];