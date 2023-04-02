export const translateRole = (role: number): string => {
    switch(role) {
        case 1: return "Administrador";
        case 2: return "Operador";
        case 3: return "Residente";
    }
};