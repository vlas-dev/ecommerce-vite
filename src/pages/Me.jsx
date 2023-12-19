import React, { useEffect, useState } from "react";
import UserData from "../components/me/UserData";
import MisCompras from "../components/me/MisCompras";
import MisPublicaciones from "../components/me/MisPublicaciones";
import { useNavigate } from "react-router-dom";
import crudAxios from "../config/axios";
import { FaCamera } from "react-icons/fa";

export default function Me() {
  const [userRole, setUserRole] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token },
        };

        const response = await crudAxios.get("/me", config);
        setUserRole(response.data.usuario.role);
        setActiveTab("UserData"); // Set an initial tab here if needed
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("x-token")) {
      navigate("/signin");
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "UserData":
        return <UserData />;
      case "MisCompras":
        return <MisCompras />;
      case "MisPublicaciones":
        return <MisPublicaciones />;
      default:
        return null;
    }
  };

  return (
    <div className=" pt-44 md:pt-28">
      {userRole !== "" && (
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 mx-2 text-sm font-medium ${
              activeTab === "UserData"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("UserData")}
          >
            Mis Datos
          </button>
          <button
            className={`px-4 py-2 mx-2 text-sm font-medium ${
              activeTab === "MisCompras"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("MisCompras")}
          >
            Mis Compras
          </button>
          {userRole === "ADMIN_ROLE" && (
            <button
              className={`px-4 py-2 mx-2 text-sm font-medium ${
                activeTab === "MisPublicaciones"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("MisPublicaciones")}
            >
              Mis Publicaciones
            </button>
          )}
        </div>
      )}
      <div className="tab-content p-4">{userRole !== "" && renderTabContent()}</div>
    </div>
  );
}
