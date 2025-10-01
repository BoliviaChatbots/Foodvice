import { useParams } from "react-router-dom";
import { nameToURL } from '../services/utils';
import restos from "../data/resto.json"; // Aquí tienes todos los restaurantes

const Restaurantes = () => {
    const { url } = useParams(); // obtiene el id desde la URL
    const restaurant = restos.find((rest) => nameToURL(rest.titulo) === url);

    if (!restaurant) {
        return <h2>Restaurante no encontrado 😢</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{restaurant.titulo}</h1>
            <img
                src={restaurant.imagen}
                alt={restaurant.titulo}
                style={{ width: "400px", borderRadius: "10px" }}
            />
            <p><strong>Dirección:</strong> {restaurant.direccion}</p>
            <p><strong>Estilo:</strong> {restaurant.estilo}</p>
            <p><strong>Descripción:</strong> {restaurant.descripcion}</p>

            <h3>Plato recomendado 🍽️</h3>
            {/* <img
                src={restaurant.comidaImagen || "/images/default-food.png"}
                alt={restaurant.comidaNombre}
                style={{ width: "200px" }}
            />
            <p>{restaurant.comidaNombre}</p>
            <p><strong>Precio:</strong> {restaurant.comidaPrecio ? `${restaurant.comidaPrecio} bs.` : "No disponible"}</p>
            <p><strong>Promo:</strong> {restaurant.promo || "Sin promo"}</p> */}
        </div>
    );
};

export default Restaurantes;

