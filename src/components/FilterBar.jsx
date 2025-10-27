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

    // 🔹 MODIFICADO: Key para forzar re-render al cerrar el modal
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSearch = () => {
        console.log("🔹 Buscar con:", { city, query, priceRange, level, cuisine, distance });
        // Aquí puedes llamar a tu API o filtrar restaurantes
    };

    // 🔹 MODIFICADO: función para cerrar modal y refrescar componentes
    const handleCloseFilters = () => {
        setShowFilters(false);
        setTimeout(() => setRefreshKey((prev) => prev + 1), 100); // fuerza re-render tras cerrar
    };

    return (
        <>
            {/* 🔹 MODIFICADO: agregado key={refreshKey} para forzar refresco */}
            <div key={refreshKey} className="filterbar-container">
                <div className="filterbar-inputs">
                    {/* Qué deseas comer */}
                    <DataSelect
                        className="filter-query"
                        width="300px"
                        placeholder="Qué deseas comer hoy?"
                        header="Sugerencias:"
                        options={[
                            { label: "Ver todos los restaurantes", icon: "store", value: "" },
                            { label: "Comida Italiana", icon: "dish", value: "italiana" },
                            { label: "Comida Japonesa", icon: "bowl-rice", value: "japonesa" },
                        ]}
                        icon="store"
                        value={query}
                        onChange={setQuery}
                        showSelected={true}
                        allowFreeText={true}
                    />

                    {/* Ciudad */}
                    <DataSelect
                        className="filter-city"
                        name="ciudad"
                        width="150px"
                        icon="map-pin"
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
                    />
                </div>
                <div className="filterbar-ranges">
                    {/* Comida */}
                    <DataSelect
                        className="filter-cuisine"
                        name="cuisine"
                        width="150px"
                        icon="dish"
                        placeholder="Tipo Comida"
                        header="Comida:"
                        options={[
                            { icon: "world", label: "Todos", value: "" },
                            { icon: "bowl-hot", label: "Italiana", value: "italiana" },
                            { icon: "bowl-hot", label: "Nacional", value: "nacional" },
                            { icon: "coffee", label: "Cafeterías", value: "cafe" },
                            { icon: "cake", label: "Postres", value: "postres" },
                        ]}
                        value={cuisine}
                        onChange={setCuisine}
                        showSelected={true}
                        allowFreeText={false}
                    />

                    {/* 🔹 Rango de precios */}
                    <PriceRangeSelect className="filter-price" />

                    {/* 🔹 Ubicación */}
                    <LocationSelect className="filter-location" />
                </div>


                <div className="filterbar-actions">
                    {/* Botón Filtros */}
                    <button className="filterbar-btn" onClick={() => setShowFilters(true)}>
                        <box-icon name="slider-alt" color="var(--colormaster)" size="sm"></box-icon>
                        <span>Filtros</span>
                    </button>

                    {/* Botón Buscar */}
                    <button className="filterbar-btn-primary" onClick={handleSearch}>
                        <box-icon name="search" color="var(--colorbla)" size="sm"></box-icon>
                        <span>Buscar</span>
                    </button>
                </div>
            </div>

            {/* 🔹 MODIFICADO: el modal ahora usa handleCloseFilters */}
            {showFilters && <FilterModal setShowFilters={handleCloseFilters} />}
        </>
    );
}
