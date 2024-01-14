import { useEffect } from "react";
import crudAxios from "../../config/axios";
import { useState } from "react";
import { countries } from "../../config/countries";
import { useForm } from "../../hooks/useForm/useForm";
import axios from "axios";

export const EditProfileData = ({ userData, setUserData, setIsEditing }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { formState, onInputChange, onResetForm, setState } = useForm({
    nombre: "",
    apellido: "",
    email: "",
    pais: "",
    imagen: "",
    password: "",
    estado: "",
    ciudad: "",
  });

  useEffect(() => {
    setState({
      nombre: userData.usuario.nombre,
      apellido: userData.usuario.apellido,
      email: userData.usuario.email,
      pais: userData.usuario.pais,
      imagen: userData.usuario.imagen,
      password: "",
      estado: userData.usuario.estado || "", // Set the default value to an empty string
      ciudad: userData.usuario.ciudad || "", // Set the default value to an empty string
    });
  }, [userData.usuario]);

  useEffect(() => {
    if (formState.pais.length > 0) {
      const consultarApi = async () => {
        try {
          const res = await axios.get(
            `https://www.universal-tutorial.com/api/states/${formState.pais}`,
            {
              headers: {
                Authorization: import.meta.env.VITE_APP_COUNTRY_API,
                Accept: "application/json",
              },
            }
          );
          const estados = res.data.map((estado) => estado.state_name);

          setStates(estados);
        } catch (error) {
          console.log(error);
          return [];
        }
      };
      consultarApi();
    }
  }, [formState.pais]);

  useEffect(() => {
    if (formState.estado.length > 0) {
      const consultarApi = async () => {
        try {
          const res = await axios.get(
            `https://www.universal-tutorial.com/api/cities/${formState.estado}`,
            {
              headers: {
                Authorization: import.meta.env.VITE_APP_COUNTRY_API,
                Accept: "application/json",
              },
            }
          );

          const ciudades = res.data.map((ciudad) => ciudad.city_name);

          setCities(ciudades);
          // Notify parent component that data is loaded
        } catch (error) {
          console.log(error);
          return [];
        }
      };
      consultarApi();
    }
  }, [formState.estado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { "x-token": token },
      };

      await crudAxios.put("/me/update", formState, config);
      setIsEditing(false);
      setUserData({
        ...userData,
        usuario: { ...userData.usuario, ...formState },
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      {/* // Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formState.nombre}
            onChange={onInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formState.apellido}
            onChange={onInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={onInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="pais"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>{" "}
          <select
            name="pais"
            value={formState.pais}
            onChange={onInputChange}
            className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
            id=""
          >
            <option value={""}>Country</option>
            {countries.map((country, id) => (
              <option value={country} key={id}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            name="estado"
            value={formState.estado}
            onChange={onInputChange}
            className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
            id=""
            disabled={!states.length > 0}
          >
            <option value="">State</option>
            {states.map((state, id) => (
              <option value={state} key={id}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="ciudad"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            name="ciudad"
            value={formState.ciudad}
            onChange={onInputChange}
            className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
            id=""
            disabled={!cities.length > 0}
          >
            <option value="">City</option>
            {cities.map((city, id) => (
              <option value={city} key={id}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nueva Contraseña"
            value={formState.password}
            onChange={onInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
          />
        </div>

        <div className="flex flex-col justify-between items-center">
          <button
            type="submit"
            className="w-full mb-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-950 hover:bg-gray-900 focus:outline-none"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              onResetForm();
            }}
            className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
