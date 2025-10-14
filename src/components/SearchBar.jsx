import { useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./SearchBar.css";
import DataSelect from "./DataSelect";
import CitySelect from "./CitySelect";

export default function SearchBar({ onSubmit }) {
    const { city, setCity, setQuery, query } = useSearchStore();
    // 🔹 Asegurar que al iniciar esté vacío el campo de búsqueda
    useEffect(() => {
        setQuery(""); // solo limpia una vez al montar el componente
    }, [setQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const validCities = ["Santa Cruz", "Cochabamba", "La Paz"];
        const selectedCity = validCities.includes(city) ? city : "Santa Cruz";

        const data = { city: selectedCity, query };
        console.log("🔍 Enviando búsqueda:", data);
        setQuery("");

        if (onSubmit) onSubmit(data);
        setQuery("");
    };

    return (
        <div className="search-box">
            <form className="banner-search-form" onSubmit={handleSubmit}>

                <DataSelect
                    icon="map"
                    placeholder="Selecciona una ciudad..."
                    header="Ciudades disponibles"
                    options={[
                        { detail: "Ciudad Oriental - Calor", icon: "map-pin", label: "Santa Cruz", value: "scz" },
                        { icon: "map-pin", label: "Cochabamba", value: "cbba" },
                        { detail: "Ciudad Capital - Altura", icon: "map-pin", label: "La Paz", value: "lpz" },
                    ]}
                    value={city}
                    onChange={setCity}
                    showSelected={true}
                    allowFreeText={false}
                />

                <DataSelect
                    placeholder="Qué deseas comer hoy?"
                    header="Nuestras sugerencias:"
                    options={[
                        { detail: "Los restaurantes mas solicitados", label: "Los mas reservados", icon: "calendar-edit" },
                        { label: "Ver todos los restaurantes", icon: "store" },
                        { label: "Los mas comentados", icon: "user-voice" },
                        { label: "La mejor comida Boliviana", icon: "bowl-hot" },

                        { label: "Comida Italiana", icon: "dish" },
                        { label: "Comida Japonesa", icon: "bowl-rice" }
                    ]}
                    icon="store"
                    value={query}
                    onChange={setQuery}
                    showSelected={true}
                    allowFreeText={true} // ✅ permite escribir libremente

                />

                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}
