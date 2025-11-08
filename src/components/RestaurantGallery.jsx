import { useState } from "react";
import "./RestaurantGallery.css";

export default function RestaurantGallery({ images = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openLightbox = (index = 0) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    const showPrev = () =>
        setSelectedIndex((i) => (i > 0 ? i - 1 : images.length - 1));
    const showNext = () =>
        setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : 0));

    const visibleImages = images.slice(0, 5);
    const extraCount = images.length - 5;

    return (
        <div className="gallery-wrapper container">
            <div className="gallery-layout">
                {visibleImages.map((img, index) => (
                    <div
                        key={index}
                        className={`gallery-block ${index === 0 ? "large" : ""}`}
                        onClick={() => openLightbox(index)}
                    >
                        {/* 🖼️ Imagen principal */}
                        <img src={img.img} alt={img.name || `Imagen ${index + 1}`} />

                        {/* 🔹 Ver más si hay más de 5 */}
                        {index === 4 && extraCount > 0 && (
                            <div className="overlay-more">Ver más...</div>
                        )}

                        {/* ℹ️ Info de la imagen */}
                        <div className="img-info">
                            {img.name && <span className="nombre">{img.name}</span>}
                            {img.price && <span className="precio">${img.price}</span>}
                            {img.description && (
                                <span className="descripcion">{img.description}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 💡 Lightbox */}
            {selectedIndex !== null && (
                <div className="lightbox">
                    <span className="close" onClick={closeLightbox}>×</span>
                    <span className="nav prev" onClick={showPrev}>❮</span>

                    <img
                        src={images[selectedIndex].img}
                        alt={images[selectedIndex].name || "Imagen"}
                        className="lightbox-img"
                    />

                    <div className="lightbox-info">
                        {images[selectedIndex].name && (
                            <h3>{images[selectedIndex].name}</h3>
                        )}
                        {images[selectedIndex].price && (
                            <p>💰 {images[selectedIndex].price}</p>
                        )}
                        {images[selectedIndex].description && (
                            <p>{images[selectedIndex].description}</p>
                        )}
                    </div>

                    <span className="nav next" onClick={showNext}>❯</span>
                </div>
            )}
        </div>
    );
}
