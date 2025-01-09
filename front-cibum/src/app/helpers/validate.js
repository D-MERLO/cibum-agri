import Swal from 'sweetalert2';

export const validateField = (name, value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const dniRegex = /^[0-9]{8}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]{3,}$/;
    const nameSurnameRegex = /^[a-zA-Z\s]{2,}$/;

    switch (name) {
        case 'email':
            if (!emailRegex.test(value)) {
                return "Ingresa un email válido.";
            }
            break;
        case 'password':
            if (!passwordRegex.test(value)) {
                return "La contraseña debe contener al menos 8 caracteres, una minúscula, una mayúscula y un número.";
            }
            break;
        case 'dni':
            if (!dniRegex.test(value)) {
                return "Coloca tu número de DNI, debe tener 8 números, sin puntos ni espacios.";
            }
            break;
        case 'phone':
            if (!phoneRegex.test(value)) {
                return "Ingresa un número de teléfono válido.";
            }
            break;
        case 'address':
            if (!addressRegex.test(value)) {
                return "Ingresa una dirección válida.";
            }
            break;
        case 'name':
        case 'surname':
            if (!nameSurnameRegex.test(value)) {
                return `Ingresa un ${name === 'name' ? 'nombre' : 'apellido'} válido.`;
            }
            break;
        default:
            return "";
    }
    return "";
};
