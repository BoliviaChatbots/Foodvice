import React from "react";
import "./RestaurantDescription.css";

export default function RestaurantDescription({ restaurante }) {
    if (!restaurante) return null;

    const offers = restaurante.offers || [];

    // Filtrar solo las activas
    const activeOffers = offers
        .filter((o) => o.status === "active")
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    return (
        <div className="restaurant-description">
            <div className="menu-title">Lo mejor en...</div>
            <div className="menu-text">{restaurante.description}</div>

            {activeOffers.length > 0 && (
                <div className="offers-grid">
                    {activeOffers.map((offer) => (
                        <div key={offer.id} className="offer-card-simple">
                            <div className="offer-header">
                                <h3 className="offer-name">{offer.name}</h3>
                                <span className={`offer-label ${offer.status}`}>
                                    {offer.status === "active"
                                        ? "Habilitada"
                                        : offer.status === "pending"
                                            ? "Próximamente"
                                            : "Finalizada"}
                                </span>
                            </div>

                            <div className="offer-discount-text">
                                <span className="discount-number">-{offer.percentage}%</span>

                            </div>

                            <p className="offer-description">{offer.description}</p>

                            <div className="offer-dates">
                                <p>
                                    <strong>Desde:</strong> {offer.start_date}
                                </p>
                                <p>
                                    <strong>Hasta:</strong> {offer.end_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div id="menu"></div>
        </div>
    );
}
