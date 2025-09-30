import React from "react";
import "./Banner.css";
import CustomSelect from "./CustomSelect";
// import fondo from "/public/fondos/logofull.avif" style={{ backgroundImage: `url(/fondos/logofull.avif)` }}

const Banner = () => {
    return (
        <>
            <div className="container">
                <div className="banner" >
                    <div className="banner-overlay">

                        <div className="text-content">
                            <h1 className="banner-title">Busca y reserva</h1>
                            <p className="banner-slogan">
                                en el mejor lugar
                            </p>
                        </div>

                        <img src="/fondos/bannerimg.png" alt="Comida..." />

                    </div>

                    <div className="search-box">
                        <form className="banner-search-form">
                            <CustomSelect className="selector-banner" />
                            <div className="input-wrap">
                                <box-icon className="icon-banner" name='restaurant' size='md'></box-icon>
                                <input type="text" placeholder="Qué deseas comer hoy?" />
                            </div>

                            <button type="submit">BusCar</button>
                        </form>
                    </div>


                </div>
            </div>

        </>
    );
};

export default Banner;
