import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Carousel() {
  const slideData = [
    {
      id: 1,
      link: "/product/8b2abdf9-ac0d-47bd-a56f-10a56e13b956",
      image: "/assets/discount1.png",
    },
    {
      id: 2,
      link: "/product/get/notebooks",
      image: "/assets/discount2.png",
    },
    {
      id: 3,
      link: "/product/eec47b99-7a9d-48ad-99f1-eed7caf3b891",
      image: "/assets/discount3.png",
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
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link}>
              <div className="hidden md:flex flex-col items-center shadow-md mx-16 md:mt-20 ">
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
