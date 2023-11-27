import { FiShoppingCart, FiTag } from "react-icons/fi";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import discount1 from "../../assets/discount1.png";
import discount2 from "../../assets/discount2.png";
import discount3 from "../../assets/discount3.png";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      image: discount1,
      link: "/page1",
    },
    {
      id: 2,
      image: discount2,
      link: "/page2", 
    },
    {
      id: 3,
      image: discount3,
      link: "/page3",
    },
  ];

  return (
    <div className="bg-gray-100">
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.link}>
              <div className="flex flex-col items-center bg-red-500 shadow-md mx-16">
                <div></div>
                <img src={slide.image} alt={slide.title} />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
