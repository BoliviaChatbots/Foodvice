import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🧭 Importamos el hook de navegación
import { useSearchStore } from "../store/useSearchStore";
import "./SearchBar.css";
import DataSelect from "./DataSelect";
import CitySelect from "./CitySelect";

export default function SearchBar({ onSubmit }) {
    const { city, setCity, setQuery, query } = useSearchStore();
    const navigate = useNavigate(); // 🧭 Hook de React Router

    // 🔹 Limpiar el campo de búsqueda al montar el componente
    useEffect(() => {
        setQuery("");
    }, [setQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { city, query };
        //console.log("Cambio de Pagina===> 🔍 Enviando búsqueda:", data);

        // 🔹 Guardar en Zustand (ya se guardan por setCity/setQuery)
        setCity(city);
        setQuery(query);

        // 🔹 Si existe una función onSubmit (por ejemplo para tracking), la ejecutamos
        if (onSubmit) onSubmit(data);

        // 🔹 Limpiar los inputs
        // setQuery("");

        // 🔹 Navegar a la página de restaurantes
        navigate("/restaurants");
    };

    return (
        <div className="search-box">
            <form className="banner-search-form" onSubmit={handleSubmit}>
                {/* 🏙️ Select de ciudad */}
                <DataSelect
                    icon="map"
                    placeholder="Selecciona una ciudad..."
                    header="Ciudades:"
                    options={[
                        { icon: "map-pin", label: "Santa Cruz", value: "1" },
                        { icon: "map-pin", label: "Cochabamba", value: "2" },
                        { icon: "map-pin", label: "La Paz", value: "3" },
                    ]}
                    value={city}
                    onChange={setCity}
                    showSelected={true}
                    allowFreeText={false}
                    width="30%"
                />

                {/* 🍽️ Select de búsqueda de comida */}
                <DataSelect
                    placeholder="¿Qué deseas comer hoy?"
                    header="Nuestras sugerencias:"
                    options={[
                        { label: "Ver todos los restaurantes", icon: "store", value: "" },
                        { label: "Comida Italiana", icon: "dish", value: "italiana" },
                        { label: "Comida Japonesa", icon: "bowl-rice", value: "japonesa" },
                    ]}
                    icon="store"
                    value={query}
                    onChange={setQuery}
                    showSelected={true}
                    allowFreeText={true} // ✅ permite escribir libremente
                    width="50%"
                />

                {/* 🔘 Botón de búsqueda */}
                <button type="submit" className="search-btn">
                    Buscar
                </button>
            </form>
        </div>
    );
}
