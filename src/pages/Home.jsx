import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from "../components/home/Carousel";
import HomeCards from "../components/home/HomeCards";

export default function Home() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/get/');
  const [isLoading, setIsLoading] = useState(true);

  const handleDataLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {!isLoading && !isProductPage && <Carousel />}
      <HomeCards dataLoaded={handleDataLoaded} />
    </div>
  );
}
