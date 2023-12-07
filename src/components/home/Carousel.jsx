import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Carousel() {
  const slideData = [
    {
      id: 1,
      link: "/product/46961013-56d8-4907-beed-3f29b6b984e2",
      image: "/assets/discount1.png",
    },
    {
      id: 2,
      link: "/product/get/notebooks",
      image: "/assets/discount2.png",
    },
    {
      id: 3,
      link: "/product/949959ad-067d-4b3c-8ae4-29be035d7044",
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
            <a href={slide.link}>
              <div className="hidden md:flex flex-col items-center shadow-md mx-16 md:mt-24 ">
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
