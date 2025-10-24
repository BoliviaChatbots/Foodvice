import { useEffect, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import DataSelect from "./DataSelect";
import "./FilterModal.css";
import PriceRangeSelect from "./PriceRangeSelect";
import LocationSelect from "./LocationSelect";

export default function FilterModal({ setShowFilters }) {
    const { city, setCity, cuisine, setCuisine } = useSearchStore();

    const [closing, setClosing] = useState(false); // 👈 nuevo estado para animación de salida

    const handleClose = () => {
        setClosing(true); // activa la animación de salida
        setTimeout(() => setShowFilters(false), 300); // espera antes de desmontar
    };

    // const handleAccept = () => {
    //     console.log("Filtros aplicados:", { priceRange, level, cuisine, distance });
    //     handleClose(); // también cierra con animación
    // };

    const handleEsc = (e) => {
        if (e.key === "Escape") handleClose();
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

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
                            { detail: "", icon: "map-pin", label: "Santa Cruz", value: "Santa Cruz" },
                            { icon: "map-pin", label: "Cochabamba", value: "Cochabamba" },
                            { detail: "Ciudad Capital - Altura", icon: "map-pin", label: "La Paz", value: "La Paz" },
                        ]}
                        value={city}
                        onChange={setCity}
                        showSelected={true}
                        allowFreeText={false}
                    />
                </div>
                {/* Comida */}
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
                </div>

                { /* Rango de Precios */}
                <div className="filter-section">
                    <label>Precios:</label>
                    <PriceRangeSelect />
                </div>

                <div className="filter-section">
                    <label>Ubicación:</label>
                    <LocationSelect />
                </div>




                <div className="filter-actions">
                    {/* <button className="accept-btn" onClick={handleAccept}>Aplicar</button> */}
                    <button className="cancel-btn" onClick={handleClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}
