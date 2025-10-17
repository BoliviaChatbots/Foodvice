import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./SliderDemo.css";

import restos from "../data/resto.json";
// import { fetchGetRestaurants } from "../services/Restaurantes/apiGetRestaurants.js";


import { useState, useEffect } from "react";

export default function SliderResto() {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getResto = async () => {
            try {
                // const restos = await fetchGetRestaurants()
                const restData = restos.map((rest) => {
                    const nombre = rest.titulo
                    return {
                        id: rest.id,
                        nombre,
                        imagen: rest.imagen,
                        estilo: rest.estilo,
                        // estilo: rest.cuisine?.name,
                        direccion: rest.direccion,
                        descripcion: rest.descripcion,
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
            <div className="slider-container-demo">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    // autoplay={{        //Auto Desplazar
                    //     delay: 3500,
                    //     disableOnInteraction: false,
                    // }}
                    spaceBetween={10}
                    loop={false}
                    navigation={false}
                    modules={[EffectCoverflow, Autoplay]}
                    className="swiper-demo"
                >
                    {restaurants.map((item) => (


                        < SwiperSlide key={item.id} className="slide-demo" style={{ backgroundImage: `url(${item.imagen}` }}>
                            <span>{item.nombre}</span>
                            <h1>{item.estilo}</h1>
                            <div className="texto-demo">
                                <h2>{item.descripcion}</h2>
                                <p><box-icon type='solid' name='map' color='white'></box-icon>{item.direccion}</p>
                                <h3 className="genre">Reservar</h3>
                            </div>
                            <div className="capa-demo">
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div >
        </>
    );
}
