import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import crudAxios from "../../config/axios";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import { EditUserData } from "./EditUserData";

export default function UserData() {
  const referenciaImg = useRef();
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false); // New state variable

  const leerImagen = async (e) => {
    const formData = new FormData();
    formData.append('imagen', e.target.files[0]);
    setFiles(formData);
  };

  useEffect(() => {
    if (files) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("x-token");
          const config = {
            headers: { "x-token": token },
          };

          const res = await crudAxios.post("/users/me/profile-image", files, config);
          console.log(res);
          setImageUploaded(true); // Update the state variable upon successful upload
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      fetchData();
    }
  }, [files]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token },
        };

        const res = await crudAxios.get("/me", config);
        setUserData(res.data);
        setImageUploaded(false); // Reset the state variable after fetching user data

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [imageUploaded]); // Add imageUploaded to the dependency array

  if (!userData) {
    return (
      <div className="flex justify-center mt-20 h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex justify-center py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {isEditing ? (
         <EditUserData data={[userData,setUserData,setIsEditing]}/>
        ) : (
          // User Data Display
          <>
            <div className="text-center mb-6">

            <input type="file" name="imagen"  onChange={leerImagen}  style={{display:'none'}} ref={referenciaImg}/>
            <button className="mx-auto h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center" onClick={()=>referenciaImg.current.click()}>
                {userData.usuario.imagen ? (
                  <img
                  src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/users/${userData.usuario.imagen}`}
                    alt="User"
                    className="h-full w-full object-cover"
                    
                    />
                    ) : (
                      <span className="text-gray-400 text-3xl"><FaCamera /></span>
                      )}
              </button>

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
                className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
