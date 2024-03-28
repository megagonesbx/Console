import { sign } from "jsonwebtoken";
import { SECRETKEY } from "../../config";
import { MenuItem } from "../../typings/global";

export const generateJWT = (uid: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    sign(
      payload,
      SECRETKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          return reject("400");
        }

        return resolve(token);
      }
    );
  });
};

export const getMenuByRole = (role: number): MenuItem[] => {
  const menu: MenuItem[] = [];

  switch (role) {
    case 1:
      menu.push({
        id: "apps.administrador",
        title: "Administración",
        type: "collapsable",
        icon: "heroicons_outline:clipboard-check",
        children: [
          {
            id: "apps.administrador.users",
            title: "Usuarios",
            type: "basic",
            link: "/administrador/usuarios",
          },
          {
            id: "apps.administrador.solvent",
            title: "Residentes solventes",
            type: "basic",
            link: "/administrador/residentes-solventes",
          },
        ],
      });
      break;

    case 3:
      menu.push({
        id: "apps.resident",
        title: "Residente",
        type: "collapsable",
        icon: "heroicons_outline:home",
        children: [
          {
            id: "apps.residente.payments",
            title: "Realizar pago",
            type: "basic",
            link: "/residente/pagos",
          },
        ],
      });
      break;
  }

  return menu;
};
