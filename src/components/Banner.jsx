import React from "react";
import "./Banner.css";
// import fondo from "/public/fondos/logofull.avif"

const Banner = () => {
    return (
        <div className="banner" style={{ backgroundImage: `url(/fondos/logofull.avif)` }}>
            <div className="banner-overlay">
                <div>
                    <h1 className="banner-title">Descubre y reserva</h1>
                    <p className="banner-slogan">
                        la mejor comida 😋
                    </p>
                </div>
                <div>
                    <img src="/fondos/bannerimg.png" alt="Comida..." />
                </div>
            </div>

            <div className="search-box">
                <form className="search-form">
                    <input type="text" placeholder="Qué deseas comer hoy?" />
                    <select>
                        <option>Todos</option>
                        <option>0 Tipo A</option>
                        <option>1 Tipo B</option>
                        <option>2 Tipo C</option>
                    </select>
                    <button type="submit">BusCar</button>
                </form>
            </div>
        </div>
    );
};

export default Banner;
