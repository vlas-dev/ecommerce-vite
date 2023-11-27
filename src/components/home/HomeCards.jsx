import React from "react";
import { Link } from "react-router-dom";
import { FaPercentage, FaGift, FaTag, FaStar } from "react-icons/fa";

import phone1 from "../../assets/phone1.png";
import phone2 from "../../assets/phone2.png";
import phone3 from "../../assets/phone3.png";

import notebook1 from "../../assets/notebook1.png";
import notebook2 from "../../assets/notebook2.png";
import notebook3 from "../../assets/notebook3.png";

import tablet1 from "../../assets/tablet1.png";
import tablet2 from "../../assets/tablet2.png";
import tablet3 from "../../assets/tablet3.png";

export default function HomeCards() {
  const discounts = [
    {
      id: 1,
      title: "phone1",
      description: "phone1.",
      image: phone1,
      url: "/phone1",
    },
    {
      id: 2,
      title: "phone2",
      description: "phone2.",
      image: phone2,
      url: "/phone2",
    },
    {
      id: 3,
      title: "phone3",
      description: "phone3.",
      image: phone3,
      url: "/phone3",
    },
    {
      id: 4,
      title: "notebook1",
      description: "notebook1.",
      image: notebook1,
      url: "/notebook1",
    },
    {
      id: 5,
      title: "notebook2",
      description: "notebook2.",
      image: notebook2,
      url: "/notebook2",
    },
    {
      id: 6,
      title: "notebook3",
      description: "notebook3.",
      image: notebook3,
      url: "/notebook3",
    },
    {
      id: 7,
      title: "tablet1",
      description: "tablet1.",
      image: tablet1,
      url: "/tablet1",
    },
    {
      id: 8,
      title: "tablet2",
      description: "tablet2.",
      image: tablet2,
      url: "/tablet2",
    },
    {
      id: 9,
      title: "tablet3",
      description: "tablet3.",
      image: tablet3,
      url: "/tablet3",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="pt-5 mx-40 ">
      
          <h2 className="text-3xl font-bold text-center mb-6">
            Nuestros Productos
          </h2>
          <div className="flex flex-wrap gap-5 justify-center mx-40 pb-20">
            {discounts.map((discount) => (
              <Link to={discount.url} key={discount.id}>
                <div
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex justify-center  w-64 h-72">
                    <img src={discount.image} alt={discount.title} className="m-4" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {discount.title}
                  </h3>
                  <p className="text-gray-600">
                    {discount.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
}
