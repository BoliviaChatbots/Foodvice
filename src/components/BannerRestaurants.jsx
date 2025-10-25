import React from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./BannerRestaurants.css";

export default function BannerRestaurants({ city, query, count }) {
    const { city: globalCity, query: globalQuery } = useSearchStore();

    const currentCity = city || globalCity || "tu ciudad";
    const currentQuery = query || globalQuery || "resultados";
    console.log(currentQuery);

    const resultsText =
        count === 0
            ? "Sin resultados"
            : count === 1
                ? "1 restaurante encontrado"
                : `${count} restaurantes encontrados`;

    return (
        <div className="container">
            <section className="banner-restaurants-text">
                <h1 className="banner-text-title">
                    {count > 0
                        ? `Los mejores resultados de ${currentCity}`
                        : `Restaurantes en ${currentCity}`}
                </h1>
                <p className="banner-text-subtitle">{resultsText}</p>
            </section>
        </div>
    );
}
