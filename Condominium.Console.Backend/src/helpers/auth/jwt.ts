import { sign } from "jsonwebtoken";
import { SECRETKEY } from "../../config";

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

export const getMenuByRole = (role: number): { title: string, icon: string, submenu: { route: string, url: string }[] }[] => {
    const menu: { title: string, icon: string, submenu: { route: string, url: string }[] }[] = []

    switch (role) {
        case 1:
            menu.push(
                {
                    title: 'Administración',
                    icon: 'shield',
                    submenu: [
                        { route: 'users', url: '/usuarios' },
                        { route: 'inmate', url: '/residentes' },
                        { route: 'donations', url: '/donaciones' },
                        { route: 'form', url: '/planilla' },
                        { route: 'solvent', url: '/solventes' }
                    ]
                },
                {
                    title: 'Operador',
                    icon: 'police',
                    submenu: [
                        { route: 'visits', url: '/visitantes' },
                        { route: 'reports', url: '/reportes' },
                    ]
                },
                {
                    title: 'Residente',
                    icon: 'person',
                    submenu: [
                        { route: 'payments', url: '/pagos' },
                        { route: 'history', url: '/historial-pagos' }
                    ]
                }
            );
            break;

        case 2:
            menu.push(
                {
                    title: 'Operador',
                    icon: 'police',
                    submenu: [
                        { route: 'visits', url: '/visitantes' },
                        { route: 'reports', url: '/reportes' },
                    ]
                }
            );
            break;

        case 3:
            menu.push(
                {
                    title: 'Residente',
                    icon: 'person',
                    submenu: [
                        { route: 'payments', url: '/pagos' },
                        { route: 'history', url: '/historial-pagos' }
                    ]
                }
            );
            break;
    }

    return menu;
};