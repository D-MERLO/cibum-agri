"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Custom404: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000); // Actualiza cada segundo

    const redirect = setTimeout(() => {
      router.push('/home'); // Redirige a home después de 5 segundos
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => {
      clearInterval(timer); // Limpia el temporizador cuando el componente se desmonte
      clearTimeout(redirect); // Limpia el tiempo de redirección cuando el componente se desmonte
    };
  }, [router]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-black justify-center items-center text-center">
      <div>
        <Image
          src="/404.svg" // Asegúrate de que esta imagen esté en la carpeta public
          alt="404 cheese"
          width={300}
          height={300}
        />
        <h1 className="text-white text-4xl font-bold mt-4">404 ERROR</h1>
        <p className="text-white text-xl">Page Not Found</p>
        <p className="text-white text-lg mt-2">Regresando en {countdown}...</p>
      </div>
    </div>
  );
};

export default Custom404;
