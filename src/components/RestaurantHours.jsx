// src/components/RestaurantHours.jsx
import React from "react";
import "./RestaurantHours.css";

export default function RestaurantHours({ hours = [] }) {
    if (!hours.length) return <p>No hay horarios disponibles.</p>;

    return (
        <div className="restaurant-hours card">
            <h3 className="hours-title">Horario de Atención</h3>
            <ul className="hours-list">
                {hours.map((h, index) => (
                    <li key={index}>
                        <span className="day">{h.day}</span>
                        <span className="time">{h.open} - {h.close}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
