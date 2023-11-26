import { FiShoppingCart, FiTag } from "react-icons/fi";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      title: "Oferta de Electrónica 1",
      description: "La última tecnología al alcance de tus manos.",
      price: "$499.99",
      tag: "Oferta Especial",
      tagColor: "bg-red-500",
    },
    {
      id: 2,
      title: "Oferta de Electrónica 2",
      description: "Experimenta la innovación en cada toque.",
      price: "$599.99",
      tag: "Novedad",
      tagColor: "bg-green-500",
    },
    {
      id: 3,
      title: "Oferta de Electrónica 3",
      description: "Obtén lo mejor por menos.",
      price: "$349.99",
      tag: "Oferta Exclusiva",
      tagColor: "bg-purple-500",
    },
  ];

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        speed={1000}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col items-center bg-gray-900 p-6 shadow-md mx-16">
              <div className="mb-4">
                <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${slide.tagColor}`}>
                  <FiTag className="inline mr-1" />
                  {slide.tag}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">
                {slide.title}
              </h2>
              <p className="text-sm text-blue-100 mb-2">
                {slide.description}
              </p>
              <p className="text-xl font-bold text-white mb-4">{slide.price}</p>
              <button className="flex items-center bg-white px-4 py-2 rounded hover:bg-gray-300 mb-4">
                <FiShoppingCart className="mr-2" /> Comprar
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}