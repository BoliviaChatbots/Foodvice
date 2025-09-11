import React from "react";
import "./Banner.css";
// import fondo from "/public/fondos/logofull.avif" style={{ backgroundImage: `url(/fondos/logofull.avif)` }}

const Banner = () => {
    return (
        <>
            <div className="container">
                <div className="banner" >
                    <div className="banner-overlay">
                        <div>
                            <img src="/fondos/bannerimg.png" alt="Comida..." />
                        </div>
                        <div>
                            <h1 className="banner-title">Busca y reserva</h1>
                            <p className="banner-slogan">
                                en el mejor lugar 😋
                            </p>
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

                </div>
            </div>

        </>
    );
};

export default Banner;
