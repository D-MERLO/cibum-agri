"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000); 

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [router]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-black justify-center">
      <Image
        src="/logo.svg"
        alt="logo cibum-agri"
        width={300}
        height={300}
        className="animate-grow"
      />
    </div>
  );
}


