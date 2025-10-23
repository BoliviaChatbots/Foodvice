import React from "react";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantList.css";

export default function RestaurantList({ data = [] }) {
    if (!data || data.length === 0) {
        return (
            <div className="restaurant-empty">
                <p>😔 No se encontraron restaurantes con tu búsqueda.</p>
            </div>
        );
    }

    return (
        <div className="restaurant-list">
            {data.map((restaurante) => (
                <RestaurantCard key={restaurante.id} restaurante={restaurante} />
            ))}
        </div>
    );
}
