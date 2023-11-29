import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import crudAxios from "../../config/axios";
import { CRMContext } from "../context/CRMcontext";

export default function SignIn() {
  const {formState,onInputChange} = useForm({
    email:'',
    password:''
  })
  const [ auth,setAuth] = useContext(CRMContext)
  const autenticarUser = async(e) =>{
    e.preventDefault()
    try {
      const res = await crudAxios.post('/signin', formState) 
      const {token} = res.data
      localStorage.setItem('x-token',token)
      setAuth({
        token,
        auth:true
     })
      console.log(res.data)
    } catch (error) {
 
      const errors = error.response.data.msg
      console.log(errors)

    }
  }
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Ingresar</h2>
        <form onSubmit={autenticarUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" id="email" value={formState.email} name="email" onChange={onInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input type="password" id="password" value={formState.password} name="password" onChange={onInputChange}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Ingresar
            </button>
            <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}