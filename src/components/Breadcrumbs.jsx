// src/components/Breadcrumbs.jsx
import React from "react";
import { Home, Utensils } from "lucide-react";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ restaurant }) {
    return (
        <nav className="breadcrumbs">
            <a href="/"><Home size={18} /> <span> Inicio</span></a>
            <span className="marca">›</span>
            <a href="/restaurants"><Utensils size={18} /><span> Restaurantes</span> </a>
            <span className="marca">›</span>
            <span className="current">{restaurant?.name}</span>
        </nav>
    );
}
