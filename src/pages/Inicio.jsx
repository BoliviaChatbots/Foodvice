// src/pages/Inicio.jsx
import React from "react";
import Banner from "../components/Banner";
import Sliderestaurantes from "../components/Sliderestaurantes";
import ShowCardslide from "../components/ShowCardslide";
import restos from "../data/resto.json";

export const Inicio = () => {
    // Ejemplos de filtros
    const recomendados = restos.filter((r) => r.nivel >= 4.5);
    const japoneses = restos.filter((r) =>
        r.estilo?.toLowerCase().includes("japon")
    );
    const cercaDeTi = restos.slice(0, 6); // ejemplo, los primeros 6

    return (
        <div>
            <Banner />
            <ShowCardslide title="Lo más recomendado" data={recomendados} />
            <ShowCardslide title="Comida Japonesa" data={japoneses} />
            <ShowCardslide title="Cerca de ti" data={cercaDeTi} />
            <Sliderestaurantes />
        </div>
    );
};
