import React from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./BannerRestaurants.css";

export default function BannerRestaurants({ city, query, count }) {
    const { city: globalCity, query: globalQuery } = useSearchStore();

    const currentCity = city || globalCity || "Tu ciudad";
    const currentQuery = query || globalQuery || "comida";
    const resultsText =
        count === 0
            ? "Sin resultados"
            : count === 1
                ? "1 restaurante encontrado"
                : `${count} restaurantes encontrados`;

    return (
        <div className="container">
            <section className="banner-restaurants ">
                <div className="banner-rest-overlay">
                    <h1 className="banner-title">
                        {currentQuery
                            ? `Restaurantes en ${currentCity} que ofrecen ${currentQuery}`
                            : `Restaurantes en ${currentCity}`}
                    </h1>
                    <p className="banner-subtitle">{resultsText}</p>
                </div>
            </section>
        </div>
    );
}
