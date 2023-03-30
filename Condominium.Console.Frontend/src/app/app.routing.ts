import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { getMainRoute } from './utils/menu';
import { AdminGuard } from './modules/auth/admin.guard';

const mainRoute = getMainRoute();

export const appRoutes: Route[] = [
    // TODO: VALIDATE THE PATH / TO REDIRECT TO THE MAIN ROUTE THAT DEPENDS ABOUT THE USER ROLE
    {
        path: 'auth',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
            { path: '**', pathMatch: 'full', redirectTo: 'sign-in' }
        ]
    },
    {
        path: 'administrador',
        // canActivateChild: [AdminGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'usuarios', canActivate: [AdminGuard], loadChildren: () => import('app/modules/admin/users/users.module').then(m => m.UsersModule) },
            { path: 'residentes', canActivate: [AdminGuard], loadChildren: () => import('app/modules/admin/residents/residents.module').then(m => m.ResidentsModule) },
            { path: 'donaciones', canActivate: [AdminGuard], loadChildren: () => import('app/modules/admin/donations/donations.module').then(m => m.DonationsModule) },
            { path: 'planilla', canActivate: [AdminGuard], loadChildren: () => import('app/modules/admin/forms/forms.module').then(m => m.FormsModule) },
            { path: 'residentes-solventes', canActivate: [AdminGuard], loadChildren: () => import('app/modules/admin/solvents/solvents.module').then(m => m.SolventsModule) },
            { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
            { path: '**', pathMatch: 'full', redirectTo: 'usuarios' }
        ]
    },
    {
        path: 'operador',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'visitas', loadChildren: () => import('app/modules/operator/visits/visits.module').then(m => m.VisitsModule) },
            { path: 'reportes-incidentes', loadChildren: () => import('app/modules/operator/reports/reports.module').then(m => m.ReportsModule) },
            { path: '', pathMatch: 'full', redirectTo: 'visitas' },
            { path: '**', pathMatch: 'full', redirectTo: 'visitas' },
        ]
    },
    {
        path: 'residente',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'pagos', loadChildren: () => import('app/modules/resident/payments/payments.module').then(m => m.PaymentsModule) },
            { path: 'historial-pagos', loadChildren: () => import('app/modules/resident/history/history.module').then(m => m.HistoryModule) },
            { path: '', pathMatch: 'full', redirectTo: 'pagos' },
            { path: '**', pathMatch: 'full', redirectTo: 'pagos' }
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: `${mainRoute}` },
    { path: '**', pathMatch: 'full', redirectTo: `${mainRoute}` }
];