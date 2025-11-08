// src/components/RestaurantHero.jsx
import React from "react";
import "./RestaurantHero.css";

export default function RestaurantHero({ restaurant }) {
    if (!restaurant) return null;

    return (
        <section className="restaurant-hero container">
            <div className="restaurant-hero-content ">
                <div className="hero-left">
                    <div className="hero-title">{restaurant.name}</div>

                    <div className="hero-subinfo">
                        <div className="hero-type">
                            <box-icon type="solid" size="sm" color="grey" name="map"></box-icon>
                            <span className="hero-rank">{restaurant.street}</span>

                        </div>

                        <div className="hero-type">
                            <box-icon type="solid" size="sm" color="grey" name="star"></box-icon>
                            <span className="hero-rank">{restaurant.rating}</span>
                            <span className="hero-rank">  ( 234 opiniones )</span>
                        </div>


                        <div className="hero-type">
                            <box-icon type="regular" size="sm" color="grey" name="restaurant"></box-icon>
                            <span className="hero-rank">{restaurant.cuisine.name}</span>

                        </div>
                        <div className="hero-type">
                            <box-icon type="regular" size="sm" color="grey" name="medal"></box-icon>
                            <span className="hero-rank">Top 3 en {restaurant.city.name}</span>
                        </div>
                    </div>
                </div>

                {/* <div className="hero-right">
                    <div className="user-info" >
                        <span className="user-name-icon"> Compartir</span>
                        <box-icon
                            type="solid"
                            className="user-avatar"
                            size="sm"
                            color="grey"
                            name="share-alt"
                        ></box-icon>                        
                    </div>
                    <div className="user-info">
                        <span className="user-name-icon"> Opinar</span>
                        <box-icon
                            type="solid"
                            className="user-avatar"
                            size="sm"
                            color="grey"
                            name="edit-alt"
                        ></box-icon>
                    </div>
                    <div className="user-info">
                        <span className="user-name-icon"> Guardar</span>
                        <box-icon
                            type="solid"
                            className="user-avatar"
                            size="sm"
                            color="grey"
                            name="heart"
                        ></box-icon>
                    </div>
                    
                </div> */}
            </div>
        </section>
    );
}
