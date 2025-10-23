import { useEffect, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import DataSelect from "./DataSelect";
import "./FilterModal.css";

export default function FilterModal({ setShowFilters }) {
    const {
        priceRange,
        setPriceRange,
        level,
        setLevel,
        cuisine,
        setCuisine,
        distance,
        setDistance,
    } = useSearchStore();

    const [closing, setClosing] = useState(false); // 👈 nuevo estado para animación de salida

    const handleClose = () => {
        setClosing(true); // activa la animación de salida
        setTimeout(() => setShowFilters(false), 300); // espera antes de desmontar
    };

    const handleAccept = () => {
        console.log("Filtros aplicados:", { priceRange, level, cuisine, distance });
        handleClose(); // también cierra con animación
    };

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

                {/* 🔹 Rango de precios */}
                <div className="filter-section">
                    <label>Rango de precios (0-100 Bs.)</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>{priceRange} Bs.</span>
                </div>

                {/* 🔹 Nivel */}
                <div className="filter-section">
                    <label>Nivel mínimo</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </div>

                {/* 🔹 Tipo de cocina */}
                <div className="filter-section">
                    <DataSelect
                        label="Tipo de cocina"
                        options={[
                            { label: "Italiana" },
                            { label: "Japonesa" },
                            { label: "Argentina" },
                            { label: "Boliviana" },
                        ]}
                        value={cuisine}
                        onChange={setCuisine}
                        allowFreeText={false}
                    />
                </div>

                {/* 🔹 Ubicación */}
                <div className="filter-section">
                    <DataSelect
                        label="Ubicación"
                        options={[
                            { label: "100 metros" },
                            { label: "1 Km" },
                            { label: "Toda la ciudad" },
                        ]}
                        value={distance}
                        onChange={setDistance}
                        allowFreeText={false}
                    />
                </div>

                <div className="filter-actions">
                    <button className="accept-btn" onClick={handleAccept}>Aplicar</button>
                    <button className="cancel-btn" onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
