// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useState, useEffect } from "react";
import Cardslide from "./Cardslide";

import './ShowCardslide.css'
import { fetchGetRestaurants } from "../services/Restaurantes/apiGetRestaurants.js";
// import data from "../data/resto.json";

const ShowCardslide = () => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getResto = async () => {
            try {
                const restos = await fetchGetRestaurants()
                const restData = restos.map((rest) => {
                    const nombre = rest.name
                    return {
                        id: rest.id,
                        nombre,
                        imagen: rest.imagen,
                        estilo: rest.cuisine?.name,
                        direccion: rest.street,
                        descripcion: rest.description,
                    };
                });
                setRestaurants(restData)
            } catch (error) {
                console.log(`Error get Restaurantes: `, error);
            }
        }
        getResto();
    }, []);


    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <Swiper className="card-list"
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={false}
                        spaceBetween={10}
                        slidesPerView={1}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                centeredSlides: true,
                            },
                            690: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                centeredSlides: false,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1020: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1350: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                        }}

                        coverflowEffect={{
                            rotate: 0,   //Rotacion de la card
                            stretch: 0, //Separacion entre imag
                            depth: 0,
                            modifier: 2,
                            slideShadows: false,
                        }}
                        autoplay={{        //Auto Desplazar
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }} //Puntitos en la base para mover
                        navigation={true} //Iconos en Izq y Der para desplazar
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    >
                        {restaurants.map((item) => (

                            <SwiperSlide key={item.id} className="card">
                                <div className="card-image">
                                    <img src={item.imagen} alt="Imagen Design" />
                                    <p className="card-tag">{item.estilo}</p>
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{item.nombre}</h3>
                                    <p className="card-text">{item.direccion}</p>
                                    <div className="card-footer">
                                        <div className="card-profile">
                                            <img src="/cardslider/user-2.jpg" alt="imagen User" />
                                            <div className="card-profile-info">
                                                <span className="card-profile-name">El mejor plato del local</span>
                                                <span className="card-profile-role">Domingos</span>
                                            </div>
                                        </div>
                                        <div className="card-promo">
                                            <button
                                                className="card-button"
                                            // onClick={() => onSelectProduct(product)}
                                            >
                                                Oferta 50%
                                            </button>

                                            <a type="button" href="/restaurants/restaurant/123" className="card-button">Reservar</a>

                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>

                        ))}


                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
            </div>


        </>
    )
};

export default ShowCardslide;