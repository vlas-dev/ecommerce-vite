import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import crudAxios from "../../config/axios";
import { CRMContext } from "../context/CRMcontext";

export default function SignUp() {
  const { formState, onInputChange } = useForm({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role: "USER_ROLE",
    pais: "Venezuela",
    ciudad: "barcelona",
    estado: "anzoategui",
  });
  const [auth, setAuth] = useContext(CRMContext);
  const [errors, setErrors] = useState([]); // State to store errors
  const navigate = useNavigate();

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await crudAxios.post("/signup", formState);
      const { token } = respuesta.data;
      localStorage.setItem("x-token", token);
      setAuth({ token, isAuthenticated: true });
      navigate("/"); // Redirect to home after successful registration
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Update the state with the errors
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mt-10 mx-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <form onSubmit={crearUsuario} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              name="nombre"
              value={formState.nombre}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="apellido"
              value={formState.apellido}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Apellido"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contraseña"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirmar Contraseña"
            />
          </div>
          <div className="col-span-2 flex flex-col items-center">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              Registrarse
            </button>
            <Link
              to="/signin"
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              ¿Ya tienes cuenta? Ingresa
            </Link>
          </div>
        </form>
        {errors.length > 0 && (
          <div className="mt-10 absolute">
            {errors.map((err, index) => (
              <p key={index} className="text-red-600 ">
                {err.msg}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
