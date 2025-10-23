import React from "react";
import "./RestaurantMap.css";

export default function RestaurantMap() {
    return (
        <div className="restaurant-map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25556.286368410358!2d-63.18079857657737!3d-17.793356166996425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1761117305273!5m2!1ses-419!2sbo"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Restaurantes"
            ></iframe>
        </div>
    );
}
