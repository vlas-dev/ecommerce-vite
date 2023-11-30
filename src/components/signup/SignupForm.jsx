import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import crudAxios from "../../config/axios";

export default function SignUp() {
  const {formState,onInputChange} = useForm({
    nombre:'',
    apellido:'',
    email: '',
    password: '',
    role:'USER_ROLE',
    pais:'Venezuela',
    ciudad:'barcelona',
    estado:'anzoategui'
  })
  const crearUsuario = async(e) =>{
    e.preventDefault()
      try {
        const respuesta = await crudAxios.post('/signup', formState) 
        console.log(respuesta)
        
      } catch (error) {
        console.log(error)
        const errors = error.response.data.errors
        errors.map(err=>{
          console.log(err.msg)

        })
      }
  }
  
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <form onSubmit={crearUsuario}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input type="text" id="firstName" name="nombre" value={formState.nombre} onChange={onInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName"  className="block text-gray-700 text-sm font-bold mb-2">
              Apellido
            </label>
            <input type="text" id="lastName"  name="apellido" value={formState.apellido} onChange={onInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Apellido" />
          </div>
          <div className="mb-4">
            <label htmlFor="email"  className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" value={formState.email} onChange={onInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input type="password" id="password" name="password" value={formState.password} onChange={onInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********" />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña
            </label>
            <input type="password" id="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Registrarse
            </button>
            <Link to="/signin" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              ¿Ya tienes cuenta? Ingresar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
