import React from "react";
import { FaPercentage, FaGift, FaTag, FaStar } from "react-icons/fa";

export default function Discounts() {
  const discounts = [
    {
      id: 1,
      title: "20% de descuento en Electrónica",
      description: "Ahorra un 20% en todos los productos electrónicos.",
      icon: <FaPercentage size={30} color="#3498db" aria-label="Porcentaje" />,
    },
    {
      id: 2,
      title: "Regalo Gratis con Compra",
      description: "Obtén un regalo gratis con cada compra superior a $50.",
      icon: <FaGift size={30} color="#e74c3c" aria-label="Regalo" />,
    },
    {
      id: 3,
      title: "Venta Flash",
      description: "Oferta por tiempo limitado: hasta un 50% de descuento en productos seleccionados.",
      icon: <FaTag size={30} color="#f39c12" aria-label="Etiqueta" />,
    },
    {
      id: 4,
      title: "Favoritos de los Clientes",
      description: "Compra nuestros productos mejor valorados con descuentos exclusivos.",
      icon: <FaStar size={30} color="#27ae60" aria-label="Estrella" />,
    },
  ];

  return (
    <div className="bg-gray-100 h-screen pt-5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Descuentos</h2>
        <div className="grid grid-cols-2 gap-6">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <span className="inline-block p-3 rounded-full bg-blue-100 text-blue-600">
                  {discount.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{discount.title}</h3>
              <p className="text-gray-600 text-center">{discount.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
