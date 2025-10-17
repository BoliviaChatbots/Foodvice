// src/components/ShowCardslide.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectCoverflow } from "swiper/modules";
import TitleSlide from "./TitleSlide";
import Cardslide from "./Cardslide";
import { nameToURL } from "../services/utils";
import "./ShowCardslide.css";

const ShowCardslide = ({ title = "Recomendados", data = [] }) => {
    // 📌 Formateamos los datos tal como lo hacíamos en Zustand
    const formattedData = data.map((rest) => ({
        id: rest.id,
        nombre: rest.titulo,
        imagen: rest.imagen,
        estilo: rest.estilo,
        direccion: rest.direccion,
        descripcion: rest.descripcion,
        nivel: rest.nivel,
        rating: rest.rating || "?",
        categoria: rest.categoria || "General",
        prodnombre: rest.comidaNombre || "Los mejores platos",
        prodprecio: rest.comidaPrecio
            ? `${rest.comidaPrecio} bs.`
            : "El mejor precio",
        // Si no existe imagen, usar una imagen por defecto
        prodimagen: rest.comidaImagen && rest.comidaImagen.trim() !== ""
            ? rest.comidaImagen
            : `/restaurantes/default-food.png`, // <-- aquí coloca la ruta de tu imagen por defecto
        promo: rest.promo,
        tipo: rest.tipo || "",
        url: nameToURL(rest.titulo),
    }));

    return (
        <>
            <TitleSlide text={title} />
            <div className="container">
                <div className="wrapper">
                    <Swiper
                        className="card-list"
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={false}
                        spaceBetween={20}
                        navigation={true}
                        loop={false}
                        modules={[EffectCoverflow, Navigation]}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 0,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.3, // ✅ muestra una completa y parte de otra
                                spaceBetween: 10,
                            },
                            400: {
                                slidesPerView: 1.6,
                                spaceBetween: 12,
                            },
                            512: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1200: {
                                slidesPerView: 4, // ✅ 4 cards en pantallas grandes
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {formattedData.map((item) => (
                            <SwiperSlide key={item.id} className="swiper-slide-auto">
                                <Cardslide item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ShowCardslide;
