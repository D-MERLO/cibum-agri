"use client"
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '../googleLogin/googleLoginButton';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const API_URL = 'http://localhost:3000';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
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
        title: 'Login exitoso!',
        text: data.message,
        customClass: { confirmButton: 'swal-button' }
      });
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (error) {
      console.error('Error en el login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el login',
        text: 'Por favor, intenta nuevamente',
        customClass: { confirmButton: 'swal-button' }
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('Login con Google exitoso:', response);
    // Lógica adicional para manejar el login con Google
  };

  const handleGoogleLoginFailure = (response: any) => {
    console.error('Error en el login con Google:', response);
    Swal.fire({
      icon: 'error',
      title: 'Error en el login con Google',
      text: 'Por favor, intenta nuevamente',
      customClass: { confirmButton: 'swal-button' }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mirza-bold text-5xl">¡Hola de nuevo!</h2>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-md">
        <div className="my-3 input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleInputChange}
            required
            className="black p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="my-3 input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleInputChange}
            required
            className="black p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="button" onClick={toggleShowPassword} className="register-button">
            {showPassword ? (
              <img src="/icons/open.svg" alt="Mostrar contraseña" />
            ) : (
              <img src="/icons/closed.svg" alt="Ocultar contraseña" />
            )}
          </button>
        </div>
        <button type="submit" className="button-contrast register-button">
          Iniciar Sesión
        </button>
        <GoogleLoginButton
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        />
        <p className="mt-8 text-center">
          ¿No tienes cuenta?
          <br />
          <a className="font-bold text-xl hover:underline" style={{ color: 'var(--contrast-color)' }} href="/register">Registrarse</a>
        </p>
      </form>
      <footer className="mt-6 text-center text-sm text-gray-500">
        CIBUM AGRI - Alimentos de Campo
      </footer>
    </div>
  );
};

export default LoginForm;
