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

  if (isEditing) {
    return (
      <div className="bg-gray-100 flex justify-center">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={editData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={editData.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pais">País</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={editData.pais}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={editData.estado}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={editData.ciudad}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nueva Contraseña"
                value={editData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
                });
              }}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          {/* User data display */}
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            {userData.usuario.imagen ? (
              <img src={userData.usuario.imagen} alt="User" />
            ) : (
              <span className="text-gray-400 text-2xl">?</span>
            )}
          </div>
          <div className="ml-4 text-gray-600 text-sm">
            <h2 className="text-2xl font-semibold text-gray-900 capitalize">
              {userData.usuario.nombre} {userData.usuario.apellido}
            </h2>
            <p className="my-1">
              <span className="text-gray-900 font-semibold">Email:</span>{" "}
              {userData.usuario.email}
            </p>
            <p className="my-1">
              <span className="text-gray-900 font-semibold">Contraseña:</span>{" "}
              ******
            </p>
            <p className="my-1">
              <span className="text-gray-900 font-semibold">Rol:</span>{" "}
              {userData.usuario.role === "USER_ROLE" ? "User" : "Admin"}
            </p>
            <p className="my-1 capitalize">
              <span className="text-gray-900 font-semibold">País:</span>{" "}
              {userData.usuario.pais}
            </p>
            <p className="my-1 capitalize">
              <span className="text-gray-900 font-semibold">Estado:</span>{" "}
              {userData.usuario.estado}
            </p>
            <p className="my-1 capitalize">
              <span className="text-gray-900 font-semibold">Ciudad:</span>{" "}
              {userData.usuario.ciudad}
            </p>
            <p className="my-1">
              <span className="text-gray-900 font-semibold">
                Miembro Desde:
              </span>{" "}
              {new Date(userData.usuario.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
