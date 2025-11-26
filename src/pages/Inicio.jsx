// src/pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sliderestaurantes from "../components/Sliderestaurantes";
import ShowCardslide from "../components/ShowCardslide";
import restos from "../data/resto.json";
import Loader from "../components/Loader";

export const Inicio = () => {
    const [loading, setLoading] = useState(true);

    // Simular carga real
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Ejemplos de filtros
    const recomendados = restos
        .filter((r) => r.nivel >= 4.5)
        .sort((a, b) => b.nivel - a.nivel);

    const searching = restos.filter(
        (r) =>
            r.titulo?.toLowerCase().includes("carne") ||
            r.descripcion?.toLowerCase().includes("carne")
    );

    const orderby = [...restos].sort((a, b) => a.titulo.localeCompare(b.titulo));

    return (
        <>
            <Loader show={loading} />
            <Banner />
            <ShowCardslide title="Lo más recomendado" data={recomendados} />
            <ShowCardslide title="Comida más buscada" data={searching} />
            <ShowCardslide title="Ordenados para tí" data={orderby} />
            <Sliderestaurantes />

        </>
    );
};
