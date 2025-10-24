// src/pages/RestaurantPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { nameToURL } from "../services/utils";
import "./RestaurantPage.css";

export default function RestaurantPage() {
    const { slug } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        // Cargamos los datos desde el JSON local
        import("../data/resto.json").then((module) => {
            const data = module.default;
            const found = data.find(
                (r) => nameToURL(r.titulo) === slug
            );
            setRestaurant(found || null);
        });
    }, [slug]);

    if (!restaurant) {
        return <div className="restaurant-loading">Cargando restaurante...</div>;
    }

    return (
        <div className="restaurant-page container">
            {/* 🔹 Imagen de portada */}
            <div
                className="restaurant-hero"
                style={{
                    backgroundImage: `url(${restaurant.imagen})`,
                }}
            >
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>{restaurant.titulo}</h1>
                        <div className="hero-sub">
                            <span className="rating">⭐ {restaurant.nivel}</span>
                            <span className="style">{restaurant.estilo}</span>
                            {restaurant.promo && (
                                <span className="promo">{restaurant.promo}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Contenido principal */}
            <div className="restaurant-content container">
                <div className="info">
                    <h2>Descripción</h2>
                    <p>{restaurant.descripcion}</p>

                    <h3>Dirección</h3>
                    <p>{restaurant.direccion}</p>
                    <p className="city">{restaurant.ciudad}</p>
                </div>

                <div className="featured">
                    <img
                        src={restaurant.comidaImagen}
                        alt={restaurant.comidaNombre}
                        className="featured-img"
                    />
                    <div className="featured-info">
                        <h3>{restaurant.comidaNombre}</h3>
                        <p className="price">{restaurant.comidaPrecio} Bs.</p>
                    </div>
                </div>

                <div className="map">
                    <iframe
                        title="Ubicación del restaurante"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            restaurant.direccion + " " + restaurant.ciudad
                        )}&output=embed`}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
