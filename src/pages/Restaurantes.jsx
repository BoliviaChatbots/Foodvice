import React from "react";
import { useSearchStore } from "../store/useSearchStore";
import restos from "../data/resto.json";

import BannerRestaurants from "../components/BannerRestaurants";
import FilterBar from "../components/FilterBar";
import RestaurantList from "../components/RestaurantList";
import RestaurantMap from "../components/RestaurantMap";

export default function Restaurantes() {
    const { city, query } = useSearchStore();

    // 🔹 Filtrado de datos según ciudad y búsqueda
    const filtered = restos.filter((r) => {
        const matchCity = !city || r.ciudad.toLowerCase() === city.toLowerCase();

        const matchQuery =
            !query ||
            r.titulo.toLowerCase().includes(query.toLowerCase()) ||
            r.descripcion.toLowerCase().includes(query.toLowerCase()) ||
            r.estilo.toLowerCase().includes(query.toLowerCase());

        return matchCity && matchQuery;
    });

    return (
        <>
            <FilterBar />

            <BannerRestaurants city={city} query={query} count={filtered.length} />

            {filtered.length > 0 ? (
                <div className="container"
                    style={{
                        display: "flex",
                        gap: "25px",
                        padding: "20px 10px",
                        flexWrap: "wrap",
                        justifyContent: "center",

                    }}
                >
                    {/* 🧾 Lista de restaurantes */}
                    <div
                        style={{
                            flex: "1 1 55%",
                            minWidth: "350px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <RestaurantList data={filtered} />
                    </div>

                    {/* 🗺️ Mapa de ubicación */}
                    <div
                        style={{
                            flex: "1 1 40%",
                            minWidth: "350px",
                            height: "600px",
                        }}
                    >
                        <RestaurantMap />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "80px",
                        fontSize: "1.3rem",
                        color: "#888",
                    }}
                >
                    <h3>😔 No se encontraron restaurantes con tu búsqueda.</h3>
                    <p>Prueba ajustando los filtros o buscando otra ciudad.</p>
                </div>
            )}
        </>
    );
}
