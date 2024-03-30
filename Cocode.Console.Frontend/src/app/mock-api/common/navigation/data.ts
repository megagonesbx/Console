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
                link: '/usuarios',
            },
            {
                id: 'apps.administrador.payments',
                title: 'Pagos',
                type: 'basic',
                link: '/historial-pagos',
            },
        ],
    },
    {
        id: 'apps.resident',
        title: 'Vecino',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.residente.payments',
                title: 'Realizar pago',
                type: 'basic',
                link: '/pagos',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
