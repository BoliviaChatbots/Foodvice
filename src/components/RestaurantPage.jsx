// src/pages/RestaurantPage.jsx import { useMemo } from "react";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import restos from "../data/resto.json";
import restos from "../data/apiResto.json";
import { nameToURL } from "../services/utils";
import RestaurantHero from "../components/RestaurantHero";
import RestaurantGallery from "../components/RestaurantGallery";
import Breadcrumbs from "../components/Breadcrumbs";
import StickyMenu from "../components/StickyMenu";
import "./RestaurantPage.css";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantDescription from "./RestaurantDescription";

export default function RestaurantPage() {
    const { url } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    // const [imagenes, setImagenes] = useState([]);
    const [isSticky, setIsSticky] = useState(false);

    const descripcionRef = useRef(null);
    const stickyContainerRef = useRef(null);

    // Buscar restaurante en resto.json usando nameToURL
    useEffect(() => {
        const found = restos.find((r) => nameToURL(r.name) === url);
        console.log("FOUND: ", found);

        if (!found) {
            console.warn("Restaurante no encontrado:", url);
            navigate("/restaurants");
            return;
        }
        setRestaurant(found);
    }, [url, navigate]);

    // ✅ Generar un solo array con TODAS las imágenes
    const allImages = useMemo(() => {
        if (!restaurant) return [];

        const images = [];

        if (restaurant.imagen) {
            images.push({ img: restaurant.imagen });
        }
        if (Array.isArray(restaurant.menu_items)) {
            restaurant.menu_items.forEach((item) => {
                images.push({
                    img: item.imagen,
                    name: item.name || "",
                    price: item.price || "",
                    description: item.description || "",
                });
            });
        }
        if (Array.isArray(restaurant.images)) {
            restaurant.images.forEach((item) => {
                images.push({ img: item.image });
            });
        }

        return images;
    }, [restaurant]);




    // // Simular carga de API (apiResto.json)
    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const response = await fetch("http://192.168.0.16:8000/api/restaurants/8/"); // estático
    //             const data = await response.json();
    //             setImagenes(data);
    //         } catch (error) {
    //             console.error("Error cargando imágenes:", error);
    //         }
    //     };
    //     fetchImages();
    // }, []);

    // Sticky activado cuando descripción desaparece del viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsSticky(!entry.isIntersecting),
            { threshold: 0 }
        );
        if (descripcionRef.current) observer.observe(descripcionRef.current);
        return () => observer.disconnect();
    }, []);

    if (!restaurant) return <p>Cargando restaurante...</p>;

    return (
        <div className="restaurant-page">
            <section id="hero" ref={descripcionRef} >
                {/* 🧭 Migas de Pan */}
                <div className="container" >
                    <Breadcrumbs restaurant={restaurant} />
                </div>

                {/* 🏞️ HERO */}
                <div className="hero-section">
                    <RestaurantHero restaurant={restaurant} />
                </div>

                {/* 🖼️ GALERÍA */}
                <div className="gallery-section" >
                    <RestaurantGallery images={allImages} />
                </div>
            </section>
            <div id="descripcion" >

            </div>
            {/* 📌 MENÚ STICKY */}
            <div
                ref={stickyContainerRef}
                className={`sticky-menu-container ${isSticky ? "active" : ""}`}
            >
                <div className="container" >
                    <StickyMenu restaurante={restaurant} />
                </div>
            </div>

            {/* 🧩 CONTENIDO PRINCIPAL */}
            <div className="container ">
                <div className="restaurant-columns">
                    {/* COLUMNA IZQUIERDA */}
                    <div className="left-column">
                        <section >
                            <RestaurantDescription restaurante={restaurant} />
                        </section>

                        <section >
                            <RestaurantMenu restaurante={restaurant} />
                        </section>

                        <section id="opiniones">
                            <h2>Opiniones</h2>
                            <p>Comentarios y opiniones de los clientes.</p>
                        </section>
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="right-column">
                        <section className="reserva-section">
                            <h2>Reserva</h2>
                            <p>Aquí irá el componente de reservas.</p>
                        </section>

                        <section className="horario-section">
                            <h2>Horario</h2>
                            <p>Lunes a Domingo: 12:00 - 23:00</p>
                        </section>

                        <section className="mapa-section">
                            <h2>Ubicación</h2>
                            <div className="map-placeholder">
                                📍 Aquí va el mapa del restaurante
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
