import { useState, useEffect, useRef } from "react";
import "./CustomSelect.css";

export default function CustomSelect() {
    const options = [
        "Santa Cruz, Bolivia",
        "Cochabamba, Bolivia",
        "La Paz, Bolivia",
        "Oruro, Bolivia",
        "Tarija, Bolivia",
        "Madrid, España",
        "Barcelona, España",
    ];
    const defecto = options[0];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defecto);
    const [search, setSearch] = useState(defecto);
    const selectRef = useRef(null);

    // Filtrar según lo que se escriba
    const filtered = options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setOpen(false);

                // 🔥 Si el input quedó vacío o no coincide con value
                if (!search.trim() || search !== value) {
                    if (filtered.length > 0) {
                        // Auto-seleccionar la primera opción filtrada
                        setValue(filtered[0]);
                        setSearch(filtered[0]);
                    } else {
                        // Volver al defecto si no hay resultados
                        setValue(defecto);
                        setSearch(defecto);
                    }
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value, search, defecto, filtered]);

    return (
        <div className="banner-select" ref={selectRef}>
            <div
                className={`banner-input-box ${open ? "focus" : ""}`}
                onClick={() => setOpen(true)}
            >
                <box-icon className="banner-box-icon" size="md" name="map-pin" type="solid"></box-icon>

                <input
                    type="text"
                    value={search}
                    placeholder="Escribe una ciudad..."
                    onFocus={() => {
                        setSearch(""); // 🔥 limpiar el campo al hacer click
                        setOpen(true); // abrir dropdown
                    }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setOpen(true);
                    }}
                />
            </div>

            {open && filtered.length > 0 && (
                <div className="dropdown">
                    {filtered.map((opt, i) => (
                        <div
                            key={i}
                            className="option"
                            onClick={() => {
                                setValue(opt);
                                setSearch(opt);
                                setOpen(false);
                                console.log("Seleccionaste:", opt);
                            }}
                        >
                            <box-icon className="banner-box-icon" size="md" name="map" type="solid"></box-icon>{opt}
                        </div>
                    ))}
                </div>
            )}

            {open && filtered.length === 0 && (
                <div className="dropdown empty">No hay resultados</div>
            )}
        </div>
    );
}
