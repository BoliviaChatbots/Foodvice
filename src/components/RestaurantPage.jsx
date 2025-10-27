// RestaurantPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nameToURL } from "../services/utils"; // si lo usas para slug match
import restos from "../data/resto.json"; // tu JSON local
import "./RestaurantPage.css";

// Swiper (slider de fotos)
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

/*
  RestaurantPage.jsx
  - Página completa y autónoma (a futuro se puede descomponer en subcomponentes):
    Header (hero), PhotoSlider, MenuList (3 secciones), ReservationCard (right column),
    Map y detalles al final.
*/

export default function RestaurantPage() {
    const { url } = useParams(); // asumiendo ruta: /restaurant/:url
    const navigate = useNavigate();
    console.log(url);


    const [restaurant, setRestaurant] = useState(null);
    const [photos, setPhotos] = useState([]); // array de imágenes para el slider
    const [menu, setMenu] = useState({ starters: [], mains: [], desserts: [] });

    useEffect(() => {
        // Buscar restaurante por slug (nameToURL) en tu JSON local
        const found = restos.find((r) => {
            // si en tu app usas nameToURL para generar url, úsalo también para buscar
            return (nameToURL ? nameToURL(r.titulo) : r.titulo.toLowerCase().replace(/\s+/g, "-")) === url;
        });

        if (!found) {
            // si no existe, redirigir a /restaurants o mostrar mensaje
            setRestaurant(null);
            return;
        }

        setRestaurant(found);

        // Photos: usa comidaImagen, imagen y algunas imágenes de placeholder si faltan
        const p = [
            found.comidaImagen || "/restaurantes/default-food.png",
            found.imagen || "/restaurantes/pagina.jpg",
            // añade placeholders si quieres
            "/restaurantes/food-1.jpg",
            "/restaurantes/food-2.jpg",
            "/restaurantes/food-3.jpg",
            "/restaurantes/food-4.jpg",
        ].filter(Boolean);
        setPhotos(p);

        // Menú (ejemplo minimalista generado a partir de los datos)
        const starters = [
            { id: "s1", name: "Ensalada fresca", desc: "Lechuga, tomate, aderezo casero", price: 20 },
            { id: "s2", name: "Bruschetta", desc: "Pan tostado con tomate y albahaca", price: 18 },
        ];
        const mains = [
            { id: "m1", name: found.comidaNombre || "Plato principal", desc: found.descripcion || "Delicioso", price: found.comidaPrecio || 60 },
            { id: "m2", name: "Pasta Alfredo", desc: "Salsa cremosa, parmesano", price: 55 },
        ];
        const desserts = [
            { id: "d1", name: "Tiramisú casero", desc: "Tradicional", price: 22 },
            { id: "d2", name: "Helado artesanal", desc: "Varios sabores", price: 18 },
        ];
        setMenu({ starters, mains, desserts });
    }, [url]);

    if (restaurant === null) {
        return (
            <div className="restaurant-page-loading">
                <p>No se encontró el restaurante🚨. <button onClick={() => navigate("/restaurants")}>Volver</button></p>
            </div>
        );
    }

    return (
        <div className="restaurant-page-root">
            {/* HERO: imagen grande, nombre y meta */}
            <header
                className="restaurant-hero"
                style={{ backgroundImage: `url(${restaurant?.imagen || "/restaurantes/default-cover.jpg"})` }}
            >
                <div className="hero-overlay">
                    <div className="hero-left">
                        <h1 className="hero-title">{restaurant.titulo}</h1>
                        <div className="hero-meta">
                            <span className="badge rating"> <i className="bx bxs-star"></i> {restaurant.nivel}</span>
                            <span className="badge tipo">{restaurant.estilo}</span>
                            {restaurant.promo && <span className="badge promo">{restaurant.promo}</span>}
                        </div>
                        <p className="hero-sub">{restaurant.direccion} • {restaurant.ciudad}</p>
                    </div>

                    {/* Info pequeña o acciones */}
                    <div className="hero-actions">
                        <button className="btn-action">Ver menú</button>
                        <button className="btn-action outline" onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>Reservar</button>
                    </div>
                </div>
            </header>

            {/* Main layout: left content + right reservation */}
            <main className="restaurant-main container">
                <section className="left-col">
                    {/* Photo slider */}
                    <div className="section card photo-slider">
                        <h2 className="section-title">Fotos</h2>
                        <PhotoSlider photos={photos} />
                    </div>

                    {/* Descripción y detalles */}
                    <div className="section card details">
                        <h2 className="section-title">Acerca del restaurante</h2>
                        <p className="text-muted">{restaurant.descripcion}</p>

                        <div className="detail-grid">
                            <div><strong>Dirección</strong><div className="muted">{restaurant.direccion}</div></div>
                            <div><strong>Ciudad</strong><div className="muted">{restaurant.ciudad}</div></div>
                            <div><strong>Tipo</strong><div className="muted">{restaurant.estilo}</div></div>
                            <div><strong>Rating</strong><div className="muted">⭐ {restaurant.nivel}</div></div>
                        </div>
                    </div>

                    {/* Menú */}
                    <div className="section card menu">
                        <h2 className="section-title">Menú</h2>
                        <MenuList menu={menu} />
                    </div>
                </section>

                <aside className="right-col">
                    <ReservationCard restaurantName={restaurant.titulo} />
                    {/* Featured dish quick card */}
                    <div className="card featured-plate">
                        <h3 className="small-title">Plato destacado</h3>
                        <div className="plate-row">
                            <img src={restaurant.comidaImagen || "/restaurantes/default-food.png"} alt={restaurant.comidaNombre} />
                            <div>
                                <strong>{restaurant.comidaNombre}</strong>
                                <div className="muted">{restaurant.comidaPrecio ? `${restaurant.comidaPrecio} Bs.` : "Precio no disponible"}</div>
                            </div>
                        </div>
                    </div>

                    {/* Mapa pequeño */}
                    <div className="card small-map">
                        <h3 className="small-title">Ubicación</h3>
                        <iframe
                            title="ubicacion"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.direccion + " " + restaurant.ciudad)}&output=embed`}
                            loading="lazy"
                        />
                    </div>
                </aside>
            </main>
        </div>
    );
}

/* ---------- SUBCOMPONENTES INCLUIDOS EN LA MISMA PÁGINA (para entrega rápida) ---------- */

/* PhotoSlider: usa Swiper para slider de imagenes */
function PhotoSlider({ photos = [] }) {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className="photoswiper"
            slidesPerView={1}
            spaceBetween={10}
        >
            {photos.map((src, i) => (
                <SwiperSlide key={i}>
                    <div className="slide-img">
                        <img src={src} alt={`foto-${i}`} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

/* MenuList: muestra 3 secciones sencillas */
function MenuList({ menu = { starters: [], mains: [], desserts: [] } }) {
    return (
        <div className="menu-list">
            <div className="menu-section">
                <h4> Entrantes </h4>
                {menu.starters.map((it) => (
                    <MenuItem key={it.id} item={it} />
                ))}
            </div>

            <div className="menu-section">
                <h4> Principales </h4>
                {menu.mains.map((it) => (
                    <MenuItem key={it.id} item={it} />
                ))}
            </div>

            <div className="menu-section">
                <h4> Postres </h4>
                {menu.desserts.map((it) => (
                    <MenuItem key={it.id} item={it} />
                ))}
            </div>
        </div>
    );
}
function MenuItem({ item }) {
    return (
        <div className="menu-item">
            <div className="menu-left">
                <div className="menu-name">{item.name}</div>
                <div className="menu-desc muted">{item.desc}</div>
            </div>
            <div className="menu-price">{item.price} Bs</div>
        </div>
    );
}

/* ReservationCard: simple form de reserva.
   - fecha, hora, personas
   - en esta versión solo hace console.log y muestra confirmación visual (no llama API)
*/
function ReservationCard({ restaurantName }) {
    const [date, setDate] = useState(() => {
        const d = new Date();
        return d.toISOString().slice(0, 10); // YYYY-MM-DD
    });
    const [time, setTime] = useState(() => {
        // hora por defecto 12:00
        return "12:00";
    });
    const [people, setPeople] = useState(2);
    const [message, setMessage] = useState("");

    const onReserve = (e) => {
        e.preventDefault();
        // Aquí podrías llamar a tu API de reservas.
        console.log("Reservando:", { restaurantName, date, time, people });
        setMessage(`Reserva para ${people} personas • ${date} ${time} registrada (simulado).`);
        // opcional: redirigir o abrir modal de confirmación
    };

    return (
        <div className="card reservation-card">
            <h3 className="small-title">Reservar en {restaurantName}</h3>
            <form onSubmit={onReserve} className="reservation-form">
                <label>
                    Fecha
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>

                <label>
                    Hora
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>

                <label>
                    Personas
                    <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </label>

                <button className="btn-reserve" type="submit">Reservar</button>
            </form>

            {message && <div className="reserve-message">{message}</div>}
        </div>
    );
}
