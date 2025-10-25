import { useEffect, useState, useCallback } from "react";
import { useSearchStore } from "../store/useSearchStore";
import DataSelect from "./DataSelect";
import "./FilterModal.css";
import PriceRangeSelect from "./PriceRangeSelect";
import LocationSelect from "./LocationSelect";

export default function FilterModal({ setShowFilters }) {
    const { city, setCity, cuisine, setCuisine } = useSearchStore();
    const [closing, setClosing] = useState(false); // Estado para la animación de salida

    // ✅ useCallback: evita que handleClose cambie en cada render
    const handleClose = useCallback(() => {
        setClosing(true); // activa la animación de salida
        setTimeout(() => setShowFilters(false), 300); // espera antes de desmontar
    }, [setShowFilters]);

    // ✅ Maneja la tecla Escape (definida dentro del useEffect para evitar dependencias extra)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [handleClose]); // dependemos solo de la versión estable de handleClose

    return (
        <div className="filter-modal-overlay" onClick={handleClose}>
            <div
                className={`filter-modal ${closing ? "slide-out" : "slide-in"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="filter-header">
                    <h3>Filtros avanzados</h3>
                    <button className="close-btn" onClick={handleClose}>X</button>
                </div>

                {/* 🔹 Ciudad */}
                <div className="filter-section">
                    <label>Ciudad:</label>
                    <DataSelect
                        className="ciudad"
                        name="ciudad"
                        width="150px"
                        icon="map-pin"
                        placeholder="Selecciona una ciudad..."
                        header="Ciudades:"
                        options={[
                            { icon: "map-pin", label: "Santa Cruz", value: "Santa Cruz" },
                            { icon: "map-pin", label: "Cochabamba", value: "Cochabamba" },
                            { detail: "Ciudad Capital - Altura", icon: "map-pin", label: "La Paz", value: "La Paz" },
                        ]}
                        value={city}
                        onChange={setCity}
                        showSelected={true}
                        allowFreeText={false}
                    />
                </div>

                {/* 🔹 Cocina */}
                <div className="filter-section">
                    <label>Cocina:</label>
                    <DataSelect
                        className="cuisine"
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
                </div>

                {/* 🔹 Rango de precios */}
                <div className="filter-section">
                    <label>Precios:</label>
                    <PriceRangeSelect />
                </div>

                {/* 🔹 Ubicación */}
                <div className="filter-section">
                    <label>Ubicación:</label>
                    <LocationSelect />
                </div>
                {/* 🔹 Acciones */}
                <div className="filter-actions">
                    <button className="cancel-btn" onClick={handleClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}
