// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cardslide from "./Cardslide";

import './ShowCardslide.css'
// import { fetchGetRestaurants } from "../services/Restaurantes/apiGetRestaurants.js";
import restos from "../data/resto.json";
import TitleSlide from './TitleSlide';
import { nameToURL } from '../services/utils'

const ShowCardslide = () => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getResto = async () => {
            try {
                // const restos = await fetchGetRestaurants()
                const restData = restos.map((rest) => {
                    const nombre = rest.titulo
                    const direccion = rest.direccion
                    const url = nameToURL(rest.titulo)
                    return {
                        id: rest.id,
                        nombre,
                        imagen: rest.imagen,
                        estilo: rest.estilo,
                        // estilo: rest.cuisine?.name,
                        direccion,
                        descripcion: rest.descripcion,
                        nivel: rest.nivel,
                        prodnombre: rest.comidaNombre ? rest.comidaNombre : "Los mejores platos",
                        // Si existe precio, concatenar " bs.", si no dejar vacío
                        prodprecio: rest.comidaPrecio ? `${rest.comidaPrecio} bs.` : "El mejor precio",
                        // Si no existe imagen, usar una imagen por defecto
                        prodimagen: rest.comidaImagen && rest.comidaImagen.trim() !== ""
                            ? rest.comidaImagen
                            : `/restaurantes/default-food.png`, // <-- aquí coloca la ruta de tu imagen por defecto

                        promo: rest.promo,
                        url,
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
            <TitleSlide text="Los Mas Recomendados ✨" />
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
                                spaceBetween: 50,
                            },
                        }}

                        coverflowEffect={{
                            rotate: 0,   //Rotacion de la card
                            stretch: 0, //Separacion entre imag
                            depth: 0,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        // autoplay={{        //Auto Desplazar
                        //     delay: 3000,
                        //     disableOnInteraction: false,
                        // }}
                        loop={false}
                        // pagination={{
                        //     clickable: true,
                        // }} //Puntitos en la base para mover
                        navigation={true} //Iconos en Izq y Der para desplazar
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                    >
                        {restaurants.map((item) => (

                            <SwiperSlide key={item.id} >
                                <div className="card">

                                    <div className="card-image">
                                        <img src={item.imagen} alt="Imagen Foot vice" />
                                        {/* <p className="card-tag">{item.estilo}</p> */}
                                    </div>
                                    <div className="card-content">
                                        <div>
                                            <div className='card-tag-nivel'>
                                                <p className="card-tag">{item.estilo}</p>
                                                <box-icon type='solid' name='star' className='card-star'></box-icon>
                                                <p className="card-level">{item.nivel}</p>
                                            </div>
                                            <h3 className="card-title">{item.nombre}</h3>
                                            <p className="card-text">{item.direccion}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="card-profile">
                                                <img src={item.prodimagen} alt="Imagen Food" />
                                                <div className="card-profile-info">
                                                    <span className="card-profile-name">{item.prodnombre}</span>
                                                    <span className="card-profile-role">{item.prodprecio}</span>
                                                </div>
                                            </div>
                                            <div className="card-promo">
                                                <button
                                                    className="card-button"
                                                // onClick={() => onSelectProduct(product)}
                                                >
                                                    {item.promo}
                                                </button>
                                                <Link to={`/restaurants/${item.url}`} className="card-button">
                                                    Reservar
                                                </Link>

                                                {/* <a type="button" href="/restaurants/restaurant/123" className="card-button">Reservar</a> */}

                                            </div>

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