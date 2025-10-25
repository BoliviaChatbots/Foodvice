import { useNavigate } from "react-router-dom";
import "./RestaurantCard.css";
import { nameToURL } from "../services/utils";

export default function RestaurantCard({ restaurante }) {
    const navigate = useNavigate();

    if (!restaurante) return null;
    const url = nameToURL(restaurante.titulo);

    const handleClick = () => {
        navigate(`/restaurant/${url}`);
    };

    return (
        <div className="restaurant-card card-clean" onClick={handleClick} style={{ cursor: "pointer" }}>
            {/* Imagen principal */}
            <div className="restaurant-image">
                <img src={restaurante.imagen} alt={restaurante.titulo} />
            </div>

            {/* Contenido textual */}
            <div className="restaurant-info">
                <div className="restaurant-tag-nivel">
                    <h3 className="restaurant-title">{restaurante.titulo}</h3>
                    <box-icon type="solid" name="star" size="sm" className="restaurant-star"></box-icon>
                    <p className="restaurant-level">{restaurante.nivel}</p>
                </div>

                <div className="restaurant-tag-nivel">
                    <p className="restaurant-tag">{restaurante.estilo}</p>
                    <box-icon
                        type="solid"
                        name="heart"
                        color="red"
                        size="sm"
                        className="bx-burst-hover restaurant-star"
                    ></box-icon>
                </div>

                <p className="restaurant-text">{restaurante.direccion}</p>
                <p className="restaurant-text">{restaurante.ciudad}</p>

                {restaurante.promo && (
                    <span className="restaurant-promo">{restaurante.promo}</span>
                )}

                <p className="restaurant-text">" {restaurante.descripcion}..."</p>
            </div>
        </div>
    );
}
