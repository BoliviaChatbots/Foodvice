import React from "react";
import "./RestaurantReviews.css";

/**
 * reviews: array de objetos con:
 * { usuario: string, comentario: string, puntuacion: number (1-5), fecha?: string }
 */
export default function RestaurantReviews({ reviews = [] }) {
    if (!reviews || reviews.length === 0) {
        return (
            <section id="opiniones" className="restaurant-reviews container">
                <h2 className="section-title">Opiniones</h2>
                <p className="no-reviews">Aún no hay opiniones para este restaurante.</p>
            </section>
        );
    }

    // calcular promedio
    const avg =
        reviews.reduce((sum, r) => sum + (Number(r.puntuacion) || 0), 0) /
        reviews.length;

    const renderStars = (score) => {
        const s = Math.round(score);
        return "★".repeat(s) + "☆".repeat(5 - s);
    };

    return (
        <section id="opiniones" className="restaurant-reviews container" aria-labelledby="opiniones-title">
            <div className="reviews-header">
                <h2 id="opiniones-title" className="section-title">Opiniones</h2>
                <div className="reviews-summary" aria-hidden>
                    <span className="avg-score">{avg.toFixed(1)}</span>
                    <span className="stars">{renderStars(avg)}</span>
                    <span className="count">({reviews.length})</span>
                </div>
            </div>

            <div className="reviews-list">
                {reviews.map((r, i) => (
                    <article className="review-item" key={i}>
                        <div className="review-meta">
                            <div className="review-user">{r.usuario || "Anónimo"}</div>
                            <div className="review-rating" aria-label={`Puntuación ${r.puntuacion} de 5`}>
                                <span className="stars-small">{renderStars(r.puntuacion)}</span>
                            </div>
                        </div>

                        <p className="review-text">{r.comentario}</p>

                        {r.fecha && <div className="review-date">{new Date(r.fecha).toLocaleDateString()}</div>}
                    </article>
                ))}
            </div>

            <div className="reviews-footer">
                <button className="btn-write" type="button" aria-label="Escribir reseña">Escribir reseña</button>
            </div>
        </section>
    );
}
