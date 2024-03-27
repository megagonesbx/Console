/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps.administrador',
        title: 'Administración',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-check',
        children: [
            {
                id: 'apps.administrador.users',
                title: 'Usuarios',
                type: 'basic',
                link: '/usuarios'
            },
            {
                id: 'apps.administrador.residents',
                title: 'Residentes',
                type: 'basic',
                link: '/residentes'
            },
            {
                id: 'apps.administrador.donations',
                title: 'Donaciones',
                type: 'basic',
                link: '/donaciones'
            },
            {
                id: 'apps.administrador.form',
                title: 'Planilla',
                type: 'basic',
                link: '/planilla'
            },
            {
                id: 'apps.administrador.solvent',
                title: 'Residentes solventes',
                type: 'basic',
                link: '/residentes-solventes'
            }
        ]
    },
    {
        id: 'apps.operador',
        title: 'Operador',
        type: 'collapsable',
        icon: 'heroicons_outline:user-group',
        children: [
            {
                id: 'apps.operador.visits',
                title: 'Visitas',
                type: 'basic',
                link: '/visitas'
            },
            {
                id: 'apps.operador.reports',
                title: 'Reportes',
                type: 'basic',
                link: '/reportes'
            }
        ]
    },
    {
        id: 'apps.resident',
        title: 'Residente',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.residente.payments',
                title: 'Realizar pago',
                type: 'basic',
                link: '/pagos'
            },
            {
                id: 'apps.residente.history',
                title: 'Historial de pagos',
                type: 'basic',
                link: '/historial-pagos'
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
