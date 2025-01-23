import Image from "next/image";
import Link from "next/link";


const Contact: React.FC = () => {
    return (
        <div className="flex flex-col content-center w-11/12">
            <section className="flex flex-col items-start">
                <h1>Contáctanos</h1>
                <h2>Para dudas, consultas y pedidos especiales escríbenos:</h2>
            </section>
            <section className="flex columns-2 items-center w-11/12 space-x-12 ">
                <div className="w-11/12 mx-1">
                    <Image
                        src="/logo.svg"
                        alt="logo cibum-agri"
                        width={200}
                        height={200}
                        className="m-10"
                    />
                    <div className="flex flex-col">
                        <Link className="flex my-2" href="https://www.instagram.com/cibum.agri?igsh=ZnFieWZxY2ppb2k5" target="_blank">
                            <Image className="mx-2" src="/icons/ig.svg" alt="enlace instagram" width={27} height={27}></Image> <p className="font-semibold hover:text-contrastHover hover:underline">cibum.agri</p>
                        </Link>
                        <Link className="flex my-2" href="https://wa.me/2216414885" target="_blank">
                            <Image className="mx-2" src="/icons/phone.svg" alt="enlace teléfono" width={30} height={30}></Image> <p className="font-semibold hover:text-contrastHover hover:underline">02216414885</p>
                        </Link>
                        <Link className="flex my-2" href="mailto:cibumagri.nfm@gmail.com">
                            <Image className="mx-2" src="/icons/mail.svg" alt="enlace gmail" width={27} height={27}></Image> <p className="font-semibold hover:text-contrastHover hover:underline">cibumagri.nfm@gmail.com</p>
                        </Link>
                        <div className="flex my-2">
                            <Image className="mx-2" src="/icons/ubication.svg" alt="ubicación" width={30} height={30}></Image> <p className="font-semibold">La Plata, Buenos Aires, Argentina.</p>
                        </div>
                    </div>
                </div>
                <div className="w-10/12 ">
                    <form action="/api/emails/send-email" method="post" className="flex flex-col">
                        <label htmlFor="name" >Nombre y Apellido:</label>
                        <input type="text" id="name" name="name" required className="input-container p-1 m-1" />

                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" required className="input-container p-1 m-1" />

                        <label htmlFor="subject">Asunto:</label>
                        <input type="text" id="subject" name="subject" required className="input-container p-1 m-1" />

                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" name="message" rows={5} required className="input-container p-1 m-1"></textarea>

                        <button type="submit" className="button-contrast" >Enviar</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;