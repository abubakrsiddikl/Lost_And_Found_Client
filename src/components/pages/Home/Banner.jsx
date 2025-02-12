import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slider1 from "../../../assets/slider1.jpg";
import slider2 from "../../../assets/slider2.jpg";
import slider3 from "../../../assets/slider3.jpeg";

const Banner = () => {
  return (
    <div className=" pt-10 bg-[#F3F4F6]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slider1} className="w-full h-[300px] md:h-[450px] " alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} className="w-full h-[300px] md:h-[450px]" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} className="w-full h-[300px] md:h-[450px]" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
