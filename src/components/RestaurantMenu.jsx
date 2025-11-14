import React from "react";
import "./RestaurantMenu.css";

export default function RestaurantMenu({ restaurante }) {
    console.log(restaurante);

    if (!restaurante || !restaurante.menu_items || restaurante.menu_items.length === 0) {
        return (
            <section className="restaurant-menu">
                <h2>Menú</h2>
                <p className="no-menu">Este restaurante aún no tiene un menú disponible.</p>
            </section>
        );
    }

    // Agrupar los items por categoría
    const groupedMenu = restaurante.menu_items.reduce((acc, item) => {
        const category = item.category?.name || "Otros";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    return (
        <div className="restaurant-menu">
            <h2 className="menu-title">Menú</h2>

            {Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category} className="menu-category">
                    <h3 className="category-title">{category}</h3>
                    <div className="menu-grid">
                        {items.map((item) => (
                            <div key={item.id} className="menu-item">
                                <div className="menu-img-wrapper">
                                    <img
                                        src={item.imagen}
                                        alt={item.name}
                                        className="menu-img"
                                    />
                                </div>

                                <div className="menu-info">
                                    <div className="dividir">
                                        <div className="menu-name">{item.name}</div>
                                        <div className="menu-price">Bs {item.price}</div>
                                    </div>
                                    <div className="menu-description">{item.description}</div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div id="opiniones" ></div>
        </div>
    );
}
