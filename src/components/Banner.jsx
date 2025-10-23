import React from "react";
import "./Banner.css";

import SearchBar from "./SearchBar";
// import fondo from "/public/fondos/logofull.avif" style={{ backgroundImage: `url(/fondos/logofull.avif)` }}

const Banner = () => {
    const handleSearch = ({ city, query }) => {
        // Aquí podrías llamar a tu API o redirigir al usuario
        console.log("🚀 API CALL →", city, query);
    };
    return (
        <>
            <div className="wraper-banner">
                <div className="banner" >
                    <div className="banner-overlay">

                        <div className="text-content">
                            <h1 className="banner-title">Busca y reserva</h1>
                            <p className="banner-slogan">
                                en el mejor lugar
                            </p>
                        </div>

                        <img src="/fondos/bannerimg.png" alt="Food vice" />

                    </div>


                    {/* 🔹 Componente reutilizable */}
                    <SearchBar onSubmit={handleSearch} />

                </div>
            </div>

        </>
    );
};

export default Banner;
