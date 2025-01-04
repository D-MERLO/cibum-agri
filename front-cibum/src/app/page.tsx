import Image from "next/image"; 

export default function LandingPage() {
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
