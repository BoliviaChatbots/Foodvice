// src/pages/Inicio.jsx
import React from "react";
import Banner from "../components/Banner";
import Sliderestaurantes from "../components/Sliderestaurantes";
import ShowCardslide from "../components/ShowCardslide";
import restos from "../data/resto.json";
import FilterBar from "../components/FilterBar";

export const Inicio = () => {
    // Ejemplos de filtros
    const recomendados = restos
        .filter((r) => r.nivel >= 4.5)
        .sort((a, b) => b.nivel - a.nivel);

    const searching = restos.filter((r) =>
        r.titulo?.toLowerCase().includes("carne") ||   // ← busca "pollo" en el título
        r.descripcion?.toLowerCase().includes("carne") // ← busca "pollo" en la descripción
    );
    const orderby = [...restos].sort((a, b) => a.titulo.localeCompare(b.titulo));

    return (
        <div>
            <Banner />

            <ShowCardslide title="Lo más recomendado" data={recomendados} />
            <ShowCardslide title="Comida más buscada" data={searching} />
            <ShowCardslide title="Ordenados para tí" data={orderby} />
            <Sliderestaurantes />
        </div>
    );
};
