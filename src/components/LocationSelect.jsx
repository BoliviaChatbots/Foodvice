import React, { useState, useRef, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./LocationSelect.css";

export default function LocationSelect() {
    const {
        latitude,
        longitude,
        locationEnabled,
        distance,
        setLocation,
        clearLocation,
        setDistance,
    } = useSearchStore();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const ref = useRef(null);

    // Cierra modal al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Obtener ubicación
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("❌ Tu navegador no soporta geolocalización.");
            return;
        }
        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation(latitude, longitude);
                setLoading(false);
            },
            (err) => {
                console.error(err);
                setError("⚠️ No se pudo obtener la ubicación.");
                setLoading(false);
            }
        );
    };

    const handleReset = () => {
        clearLocation();
        setDistance("Toda la ciudad");
        setError("");
        setOpen(false);
    };

    const handleApply = () => {
        setOpen(false);
    };

    return (
        <div className="location-select-container" ref={ref}>
            {/* Botón principal */}
            <button
                className={`filter-button ${open ? "active" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <box-icon
                    name="map"
                    color="var(--ccborde)"
                    size="sm"
                ></box-icon>
                <span>
                    {locationEnabled
                        ? `GPS On (${distance})`
                        : "Ubicación"}
                </span>
                {/* <i className={`bx bx-chevron-${open ? "up" : "down"} bx-xs`}></i> */}
            </button>

            {/* Modal */}
            {open && (
                <div className="location-modal">
                    <div className="modal-content">
                        <div className="modal-header">Ubicación</div>

                        <div className="location-section">
                            <button
                                className="btn-gps"
                                onClick={handleGetLocation}
                                disabled={loading}
                            >
                                <i className="bx bx-navigation"></i>
                                {loading ? "Buscando ubicación..." : "Activar GPS"}
                            </button>

                            {error && <p className="location-error">{error}</p>}

                            {locationEnabled && (
                                <div className="coords">
                                    <p>
                                        <strong>Latitud:</strong> {latitude?.toFixed(5)}
                                    </p>
                                    <p>
                                        <strong>Longitud:</strong> {longitude?.toFixed(5)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="distance-section">
                            <label htmlFor="distance">Radio de búsqueda:</label>
                            <select
                                id="distance"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            >
                                <option value="0">Toda la Ciudad</option>
                                <option value="1">1 Km</option>
                                <option value="5">5 Km</option>
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-reset" onClick={handleReset}>
                                <i className="bx bx-eraser"></i> Borrar
                            </button>
                            <button className="btn-apply" onClick={handleApply}>
                                <i className="bx bx-check-circle"></i> Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
