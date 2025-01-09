import Swal from 'sweetalert2';
import { validateField } from '../../app/helpers/validate';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:3000';

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState({
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

        const errorMessage = validateField(name, value);
        if (errorMessage) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
            Swal.fire({
                icon: 'error',
                title: 'Error en el campo',
                text: errorMessage,
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
        { label: 'Nombre', name: 'name', type: 'text', required: true },
        { label: 'Apellido', name: 'surname', type: 'text', required: true },
        { label: 'DNI', name: 'dni', type: 'text', required: true },
        { label: 'Teléfono', name: 'phone', type: 'text', required: true },
        { label: 'Dirección', name: 'address', type: 'text', required: true },
        { label: 'Instagram', name: 'instagram', type: 'text' },
        { label: 'Correo', name: 'email', type: 'email', required: true },
        {
            label: 'Contraseña',
            name: 'password',
            type: showPassword ? 'text' : 'password',
            required: true,
            toggleShow: toggleShowPassword,
            show: showPassword,
        },
        {
            label: 'Repetir Contraseña',
            name: 'passwordAgain',
            type: showRepeatPassword ? 'text' : 'password',
            required: true,
            toggleShow: toggleShowRepeatPassword,
            show: showRepeatPassword,
            isPasswordAgain: true,
        },
    ];

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                {formInputs.map(({ label, name, type, required, toggleShow, show, isPasswordAgain }) => (
                    <div key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            value={isPasswordAgain ? passwordAgain : form.name}
                            onChange={isPasswordAgain ? (e) => setPasswordAgain(e.target.value) : handleInputChange}
                            required={required}
                        />
                        {toggleShow && (
                            <button type="button" onClick={toggleShow}>
                                {show ? 'Ocultar' : 'Mostrar'} Contraseña
                            </button>
                        )}
                        {errors[name] && <span className="error">{errors[name]}</span>}
                    </div>
                ))}
                <button type="submit">Registrarse</button>
                {/* <button type="button" className="google-register">
          <FaGoogle /> Registrarse con Google
        </button> */}
                {/* <Link href="/login">
          <a>¿Ya tienes una cuenta? Inicia sesión</a>
        </Link> */}
            </form>
        </div>
    );
};

export default RegisterForm;
