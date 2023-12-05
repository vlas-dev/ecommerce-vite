import React, { useState } from "react";
import UserData from "../components/me/UserData";
import MisCompras from "../components/me/MisCompras";

export default function Me() {
  const [activeTab, setActiveTab] = useState("UserData");

  const renderTabContent = () => {
    switch (activeTab) {
      case "UserData":
        return <UserData />;
      case "MisCompras":
        return <MisCompras />;
      default:
        return <UserData />;
    }
  };

  return (
    <div className="pt-24 md:pt-28"> {/* Adjust padding-top to avoid navbar overlap */}
      <div className="flex justify-center ">
        <button 
          className={`px-4 py-2 mx-2 text-sm font-medium ${
            activeTab === "UserData" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => setActiveTab("UserData")}
        >
          Mis Datos
        </button>
        <button 
          className={`px-4 py-2 mx-2 text-sm font-medium ${
            activeTab === "MisCompras" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => setActiveTab("MisCompras")}
        >
          Mis Compras
        </button>
       
      </div>
      <div className="tab-content p-4">
        {renderTabContent()}
      </div>
    </div>
  );
}
