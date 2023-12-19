import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import crudAxios from "../../config/axios";

export default function RecoverPassword() {
    const { formState, onInputChange } = useForm({ email: "" });

    const handleRecuperarContrasena = async (e) => {
        e.preventDefault();
        try {
            await crudAxios.post("/RecuperarContrasena", formState);
            // Mostrar mensaje de éxito o redirigir a una página de éxito
        } catch (error) {
            // Manejar errores, por ejemplo, mostrar un mensaje al usuario
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Contraseña</h2>
                <form onSubmit={handleRecuperarContrasena}>
                    <div className="floating-label-group">
                        <input
                            type="email"
                            id="email"
                            value={formState.email}
                            name="email"
                            onChange={onInputChange}
                            className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
                            placeholder="Email"
                        />
                        <label htmlFor="email" className="block bg-gray-100">
                            Email
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                            type="submit"
                        >
                            Enviar Enlace de Recuperación
                        </button>
                        <Link
                            to="/signin"
                            className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-700"
                        >
                            Volver a Ingresar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}