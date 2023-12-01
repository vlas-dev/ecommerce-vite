import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import crudAxios from "../../config/axios";
import { CRMContext } from "../context/CRMcontext";

export default function SignIn() {
  const { formState, onInputChange } = useForm({ email: "", password: "" });
  const [auth, setAuth] = useContext(CRMContext);
  const [errors, setErrors] = useState([]); // State to store errors
  const navigate = useNavigate();

  const autenticarUser = async (e) => {
    e.preventDefault();
    try {
      const res = await crudAxios.post("/signin", formState);
      const { token } = res.data;
      localStorage.setItem("x-token", token);
      setAuth({ token, isAuthenticated: true });
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Update the state with the errors
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Ingresar</h2>
        <form onSubmit={autenticarUser}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formState.email}
              name="email"
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2 sr-only"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formState.password}
              name="password"
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              Ingresar
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              ¿No tienes cuenta? Regístrate
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
