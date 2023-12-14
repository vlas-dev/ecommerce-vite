import React, { useContext, useState, useEffect } from "react";
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
    pais: "",
    ciudad: "",
    estado: "",
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

  useEffect(() => {
    if (localStorage.getItem("x-token")) {
      navigate("/me");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mt-32 mx-10 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <form onSubmit={crearUsuario} className="grid grid-cols-2">
          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            <input
              type="text"
              id="firstName"
              name="nombre"
              value={formState.nombre}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Nombre"
            />
            <label htmlFor="firstName" className="block bg-gray-100">
              Nombre
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="text"
              id="lastName"
              name="apellido"
              value={formState.apellido}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Apellido"
            />
            <label htmlFor="lastName" className="block bg-gray-100">
              Apellido
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Email"
            />
            <label htmlFor="email" className="block bg-gray-100">
              Email
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="text"
              id="country"
              name="pais"
              value={formState.pais}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="País"
            />
            <label htmlFor="country" className="block bg-gray-100">
              País
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="text"
              id="state"
              name="estado"
              value={formState.estado}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Provincia"
            />
            <label htmlFor="state" className="block bg-gray-100">
              Provincia
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="text"
              id="city"
              name="ciudad"
              value={formState.ciudad}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Ciudad"
            />
            <label htmlFor="city" className="block bg-gray-100">
              Ciudad
            </label>
          </div>

          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Contraseña"
            />
            <label htmlFor="password" className="block bg-gray-100">
              Contraseña
            </label>
          </div>
          <div className="floating-label-group col-span-2 md:col-span-1 mx-2">
            {" "}
            <input
              type="password"
              id="confirmPassword"
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Confirmar Contraseña"
            />
            <label htmlFor="confirmPassword" className="block bg-gray-100">
              Confirmar Contraseña
            </label>
          </div>
          <div className="col-span-2 flex flex-col items-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              Registrarse
            </button>
            <Link
              to="/signin"
              className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-700"
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
