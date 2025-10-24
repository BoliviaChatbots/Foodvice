import React, { useState, useRef, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./PriceRangeSelect.css";

export default function PriceRangeSelect() {
    const { priceStart, priceEnd, setPriceRange } = useSearchStore();
    const [open, setOpen] = useState(false);
    const [min, setMin] = useState(priceStart || 0);
    const [max, setMax] = useState(priceEnd || 200);
    const ref = useRef(null);

    // Cierra el modal al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChangeMin = (e) => {
        const value = Math.min(Number(e.target.value), max - 10);
        setMin(value);
    };

    const handleChangeMax = (e) => {
        const value = Math.max(Number(e.target.value), min + 10);
        setMax(value);
    };

    const handleApply = () => {
        setPriceRange(min, max);
        setOpen(false);
    };

    const handleReset = () => {
        setMin(0);
        setMax(200);
        setPriceRange(0, 200);
        setOpen(false);
    };

    return (
        <div className="price-select-container" ref={ref}>
            {/* Botón principal */}
            <button
                className={`filter-button ${open ? "active" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <box-icon name="money" color="var(--ccborde)" size="sm"></box-icon>
                <span>{min}-{max} Bs</span>

                <i className={`bx bx-chevron-${open ? "up" : "down"} bx-xs`}></i>
            </button>

            {/* Modal flotante */}
            {open && (
                <div className="price-modal">
                    <div className="modal-content">
                        <div className="modal-header">Precio</div>

                        <div className="sliders">
                            {/* Línea verde entre min y max */}
                            <div
                                className="slider-track"
                                style={{
                                    left: `${(min / 200) * 100}%`,
                                    right: `${100 - (max / 200) * 100}%`,
                                }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="5"
                                value={min}
                                onChange={handleChangeMin}
                            />
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="5"
                                value={max}
                                onChange={handleChangeMax}
                            />
                        </div>

                        <div className="values">
                            <span>{min} Bs</span>
                            <span>{max} Bs</span>
                        </div>

                        <p className="note">💡 Precio estimado por plato individual.</p>

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
