import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-creative'; // Import creative effect styles

// import required modules
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import "../style/swipper.scss";

const Swipper = () => {
  return (
    <div className='swipParent'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition:true,
        }}
        modules={[Pagination, Autoplay, EffectCreative]}
        className="mySwiper"
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
      >
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/040.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/043.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/044.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/045.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/046.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/047.webp" alt="aa" /></SwiperSlide>
        <SwiperSlide><img src="https://tecdn.b-cdn.net/img/new/standard/city/048.webp" alt="aa" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Swipper;
