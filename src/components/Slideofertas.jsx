// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
//import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Slideofertas.css';

// import required modules
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import Cardslide from './Cardslide';

export default function Slideofertas() {
    return (
        <>
            <div className='swiperofertas'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,   //Rotacion de la card
                        stretch: 10, //Separacion entre imag
                        depth: 350,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{        //Auto Desplazar
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={false} //Puntitos en la base para mover
                    navigation={false} //Iconos en Izq y Der para desplazar
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}

                >
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
