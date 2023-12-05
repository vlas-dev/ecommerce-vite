import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import crudAxios from "../../config/axios";

export default function UserData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    pais: "",
    estado: "",
    ciudad: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token },
        };

        const res = await crudAxios.get("/me", config);
        setUserData(res.data);
        setEditData({
          nombre: res.data.usuario.nombre,
          apellido: res.data.usuario.apellido,
          email: res.data.usuario.email,
          pais: res.data.usuario.pais,
          estado: res.data.usuario.estado,
          ciudad: res.data.usuario.ciudad,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("x-token")) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { "x-token": token },
      };

      await crudAxios.put("/me/update", editData, config);
      setIsEditing(false);
      setUserData({
        ...userData,
        usuario: { ...userData.usuario, ...editData },
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!userData) {
    return <div className="flex justify-center">Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 flex justify-center py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {isEditing ? (
          // Edit Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={editData.nombre}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={editData.apellido}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                value={editData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="pais"
                className="block text-sm font-medium text-gray-700"
              >
                País
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={editData.pais}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={editData.estado}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={editData.ciudad}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nueva Contraseña"
                value={editData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col justify-between items-center">
              <button
                type="submit"
                className="w-full mb-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData({
                    nombre: userData.usuario.nombre,
                    apellido: userData.usuario.apellido,
                    email: userData.usuario.email,
                    pais: userData.usuario.pais,
                    estado: userData.usuario.estado,
                    ciudad: userData.usuario.ciudad,
                    password: "",
                  });
                }}
                className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          // User Data Display
          <>
            <div className="text-center mb-6">
            <div className="mx-auto h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center">
                {userData.usuario.imagen ? (
                  <img
                    src={userData.usuario.imagen}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-3xl">?</span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {userData.usuario.nombre} {userData.usuario.apellido}
              </h2>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {userData.usuario.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Contraseña:</span>{" "}
                ******
              </p>
              <p>
                <span className="font-medium text-gray-700">Rol:</span>{" "}
                {userData.usuario.role === "USER_ROLE" ? "User" : "Admin"}
              </p>
              <p className="capitalize">
                <span className="font-medium text-gray-700">País:</span>{" "}
                {userData.usuario.pais}
              </p>
              <p className="capitalize">
                <span className="font-medium text-gray-700">Estado:</span>{" "}
                {userData.usuario.estado}
              </p>
              <p className="capitalize">
                <span className="font-medium text-gray-700">Ciudad:</span>{" "}
                {userData.usuario.ciudad}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Miembro Desde:
                </span>{" "}
                {new Date(userData.usuario.createdAt).toLocaleDateString(
                  "en-GB"
                )}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Editar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
