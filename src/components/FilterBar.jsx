import { useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import DataSelect from "./DataSelect";
import FilterModal from "./FilterModal";
import "./FilterBar.css";
import PriceRangeSelect from "./PriceRangeSelect";
import LocationSelect from "./LocationSelect";


export default function FilterBar() {
    const { city, query, setCity, setQuery, priceRange, level, cuisine, setCuisine, distance } = useSearchStore();
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        console.log("🔹 Buscar con:", { city, query, priceRange, level, cuisine, distance });
        // Aquí puedes llamar a tu API o filtrar restaurantes
    };

    return (
        <>
            {/* <div className="container"> */}

            <div className="filterbar-container ">
                <div className="filterbar-inputs">

                    {/* Qué deseas comer */}
                    <DataSelect
                        className="busqueda"
                        name="busqueda"
                        width="300px"
                        placeholder="Qué deseas comer hoy?"
                        header="Sugerencias:"
                        options={[
                            { label: "Ver todos los restaurantes", icon: "store", value: "" },
                            { label: "Comida Italiana", icon: "dish", value: "italiana" },
                            { label: "Comida Japonesa", icon: "bowl-rice", value: "pajonesa" },
                        ]}
                        icon="store"
                        value={query}
                        onChange={setQuery}
                        showSelected={true}
                        allowFreeText={true}
                    />

                    {/* Ciudad */}
                    <DataSelect
                        className="ciudad"
                        name="ciudad"
                        width="150px"
                        icon="map-pin"
                        placeholder="Selecciona una ciudad..."
                        header="Ciudades:"
                        options={[
                            { detail: "", icon: "map-pin", label: "Santa Cruz", value: "Santa Cruz" },
                            { icon: "map-pin", label: "Cochabamba", value: "Cochabamba" },
                            { detail: "Ciudad Capital - Altura", icon: "map-pin", label: "La Paz", value: "La Paz" },
                        ]}
                        value={city}
                        onChange={setCity}
                        showSelected={true}
                        allowFreeText={false}
                    />
                    {/* Comida */}
                    <DataSelect
                        className="cuisine"
                        name="cuisine"
                        width="150px"
                        icon="dish"
                        placeholder="Tipo Comida"
                        header="Comida:"
                        options={[
                            { detail: "", icon: "world", label: "Todos", value: "" },
                            { icon: "bowl-hot", label: "Italiana", value: "italiana" },
                            { detail: "", icon: "bowl-hot", label: "Nacional", value: "nacional" },
                            { detail: "", icon: "coffee", label: "Cafeterias", value: "cafe" },
                            { label: "Postres", icon: "cake", value: "postres" },
                        ]}
                        value={cuisine}
                        onChange={setCuisine}
                        showSelected={true}
                        allowFreeText={false}
                    />
                    { /* Rango de Precios */}
                    <PriceRangeSelect />
                    <LocationSelect />

                </div>
                <div className="filterbar-actions">{/* width="30%" */}
                    {/* Botón Filtros */}
                    <button className="filterbar-btn hidden" onClick={() => setShowFilters(true)}>
                        <box-icon name="slider-alt" color="var(--colormaster)" size="sm"></box-icon>
                        <span>Filtros</span>
                    </button>


                    {/* Botón Buscar */}
                    <button className="filterbar-btn primary" onClick={handleSearch}>
                        <box-icon name="search" color="var(--colorbla)" size="sm"></box-icon>
                        <span>Buscar</span>
                    </button>
                </div>
            </div>


            {/* Modal de filtros */}
            {showFilters && <FilterModal setShowFilters={setShowFilters} />}
            {/* </div> */}
        </>
    );
}
