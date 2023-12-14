import React, { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    if (localStorage.getItem("x-token")) {
      navigate("/me");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Ingresar</h2>
        <form onSubmit={autenticarUser}>
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
          <div className="floating-label-group">
            <input
              type="password"
              id="password"
              value={formState.password}
              name="password"
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Contraseña"
            />
            <label htmlFor="password" className="block bg-gray-100">
              Contraseña
            </label>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              Ingresar
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-700"
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
