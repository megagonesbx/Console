import { sign } from "jsonwebtoken";
import { SECRETKEY } from "../../config";
import { MenuItem } from "../../typings/global";

export const generateJWT = (uid: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        sign(payload, SECRETKEY, {
            expiresIn: "4h"
        }, (err, token) => {

            if (err) {
                return reject("400");
            }

            return resolve(token)
        })
    })
};

export const getMenuByRole = (role: number): MenuItem[] => {
    const menu: MenuItem[] = []

    switch (role) {
        case 1:
            menu.push(
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
                            link: '/administrador/usuarios'
                        },
                        {
                            id: 'apps.administrador.residents',
                            title: 'Residentes',
                            type: 'basic',
                            link: '/administrador/residentes'
                        },
                        {
                            id: 'apps.administrador.donations',
                            title: 'Donaciones',
                            type: 'basic',
                            link: '/administrador/donaciones'
                        },
                        {
                            id: 'apps.administrador.form',
                            title: 'Planilla',
                            type: 'basic',
                            link: '/administrador/planilla'
                        },
                        {
                            id: 'apps.administrador.solvent',
                            title: 'Residentes solventes',
                            type: 'basic',
                            link: '/administrador/residentes-solventes'
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
                            link: '/operador/visitas'
                        },
                        {
                            id: 'apps.operador.reports',
                            title: 'Reportes',
                            type: 'basic',
                            link: '/operador/reportes'
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
                            link: '/residente/pagos'
                        },
                        {
                            id: 'apps.residente.history',
                            title: 'Historial de pagos',
                            type: 'basic',
                            link: '/residente/historial-pagos'
                        }
                    ]
                }
            );
            break;

        case 2:
            menu.push(
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
                            link: '/operador/visitas'
                        },
                        {
                            id: 'apps.operador.reports',
                            title: 'Reportes',
                            type: 'basic',
                            link: '/operador/reportes'
                        }
                    ]
                }
            );
            break;

        case 3:
            menu.push(
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
                            link: '/residente/pagos'
                        },
                        {
                            id: 'apps.residente.history',
                            title: 'Historial de pagos',
                            type: 'basic',
                            link: '/residente/historial-pagos'
                        }
                    ]
                }
            );
            break;
    }

    return menu;
};