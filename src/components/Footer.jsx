import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function Footer() {

    // email of the user
    const [email, setEmail] = useState('');

    async function handleClick(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let res = emailRegex.test(email);
        if (res === false) {
            throw new Error("Email is not correct");
        }
    
        const response = await fetch(`${API_URL}/api/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        
        return 0;
    }

    return (

        <footer className="text-black w-full px-6 lg:px-20">

            <div className="flex justify-center mb-6">
                <img 
                    className="h-32 w-auto" 
                    draggable="false" 
                    src="/logoGreen.png" 
                    alt="" 
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                <div>
                    <h4 className="mb-4 font-semibold">Organización</h4>
                    <ul className="space-y-2">
                        <li><a href="/404" className="hover:underline">Sobre nosotros</a></li>
                        <li><a href="/noticias" className="hover:underline">Noticias</a></li>
                        <li><a href="/404" className="hover:underline">Contactos</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Productos</h4>
                    <ul className="space-y-2">
                        <li>
                            <p className="font-bold">Sentient-OS</p>
                            <p className="text-sm text-gray-600">
                                para simular tus modelos en entornos realistas
                            </p>
                        </li>

                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Developer Hub</h4>
                    <ul className="space-y-2">
                        <li><a href="/404" className="hover:underline">Xistra SDK</a></li>
                        <li>
                            <a href="/404" className="hover:underline">Hugging Face Hub</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">¡Apúntate para no perderte nada!</h4>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleClick(email);
                            
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Escribe tu mail aquí"
                            className="border-b border-black bg-transparent focus:outline-none py-1"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className="border-b border-black text-sm font-mono w-fit hover:underline"
                        >
                            ¡Apúntame!
                        </button>
                    </form>


                </div>
            </div>

            <div className="border-t border-gray-300 my-8"></div>

            <div
                className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            >
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/company/xistra/?viewAsMember=true" target="_blank"                    ><FaLinkedin className="text-2xl" /></a>
                </div>

                <div className="flex gap-6">
                    <a href="/privacy-policy" className="hover:underline">Política de privacidad</a>
                    <span>Copyright 2025 Xistra</span>
                </div>
            </div>
        </footer>

    )
}