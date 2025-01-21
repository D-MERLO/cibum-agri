"use client"
import Swal from 'sweetalert2';
import { validateField } from '../../app/helpers/validate';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:3000';

interface FormState {
    name: string;
    surname: string;
    dni: string;
    phone: string;
    address: string;
    instagram: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState<FormState>({
        name: '',
        surname: '',
        dni: '',
        phone: '',
        address: '',
        instagram: '',
        email: '',
        password: '',
    });
    const [passwordAgain, setPasswordAgain] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const errorMessage = validateField(name, value);
        if (errorMessage) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
            Swal.fire({
                icon: "error",
                title: 'Error en el campo',
                text: errorMessage,
                customClass: {confirmButton: 'swal-button'}
            });
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.password !== passwordAgain) {
            setErrors({ passwordAgain: 'Las contraseñas no coinciden' });
            Swal.fire({
                icon: 'error',
                title: 'Error en el campo',
                text: 'Las contraseñas no coinciden',
                customClass: {confirmButton: 'swal-button'}
            });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso!',
                text: data.message,
                customClass: {confirmButton: 'swal-button'}
            });
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (error) {
            console.error('Error en el registro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'Por favor, intenta nuevamente',
                customClass: {confirmButton: 'swal-button'}
            });
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const formInputs = [
        { name: 'name', type: 'text', placeholder: 'Nombre', required: true },
        { name: 'surname', type: 'text', placeholder: 'Apellido', required: true },
        { name: 'dni', type: 'text', placeholder: 'DNI', required: true },
        { name: 'phone', type: 'text', placeholder: 'Teléfono', required: true },
        { name: 'address', type: 'text', placeholder: 'Dirección', required: true },
        { name: 'instagram', type: 'text', placeholder: 'Instagram' },
        { name: 'email', type: 'email', placeholder: 'Correo', required: true },
        {
            name: 'password',
            type: showPassword ? 'text' : 'password',
            placeholder: 'Contraseña',
            required: true,
            toggleShow: toggleShowPassword,
            show: showPassword,
        },
        {
            name: 'passwordAgain',
            type: showRepeatPassword ? 'text' : 'password',
            placeholder: 'Repetir Contraseña',
            required: true,
            toggleShow: toggleShowRepeatPassword,
            show: showRepeatPassword,
            isPasswordAgain: true,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="mirza-bold text-5xl">¡Bienvenido!</h2>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-md">
                {formInputs.map(({ name, type, placeholder, required, toggleShow, show, isPasswordAgain }) => (
                    <div key={name}>
                        <div className="my-3 input-container">
                            <input
                                type={type}
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                value={isPasswordAgain ? passwordAgain : form[name as keyof FormState]}
                                onChange={isPasswordAgain ? (e) => setPasswordAgain(e.target.value) : handleInputChange}
                                onBlur={isPasswordAgain ? undefined : handleBlur}
                                required={required}
                                className="black p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {toggleShow && (
                                <button type="button" onClick={toggleShow} className="register-button">
                                    {show ? (
                                        <img src="/icons/open.svg" alt="Mostrar contraseña" />
                                    ) : (
                                        <img src="/icons/closed.svg" alt="Ocultar contraseña" />
                                    )}
                                </button>
                            )}
                        </div>
                        {errors[name] && <span className="text-sm text-red-500">{errors[name]}</span>}
                    </div>
                ))}
                <button type="submit" className="button-contrast register-button">
                    Registrarse
                </button>
                <p className="mt-8 text-center">
                    ¿Ya tienes cuenta?
                    <br />
                    <a className="font-bold text-xl hover:underline" style={{ color: 'var(--contrast-color)' }} href="/login">Iniciar sesión</a>
                </p>
            </form>
            <footer className="mt-6 text-center text-sm text-gray-500">
                CIBUM AGRI - Alimentos de Campo
            </footer>
        </div>
    );
};

export default RegisterForm;

