export const translateRole = (role: number): string => {
    switch (role) {
        case 1: return "Administrador";
        case 2: return "Operador";
        case 3: return "Residente";
    }
};

export const roles: { id: number, description: string }[] = [
    {
        id: 1,
        description: 'Administrador'
    },
    {
        id: 2,
        description: 'Operador'
    },
    {
        id: 3,
        description: 'Residente'
    }
]

export const splitName = (name: string): string[] => {

    const partes = name.trim().split(' ');

    const [nombre, apellido] = partes;
    return [nombre, apellido];
};

export const transformDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
};