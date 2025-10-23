import { useState, useEffect, useRef } from "react";
import "./DataSelect.css";

const DataSelect = ({
    options = [],
    value = "",
    onChange,
    placeholder = "Seleccionar...",
    className = "",
    label = "",
    icon = "",
    width = "100%",
    showSelected = true,
    allowFreeText = false,
    header = "", // 🆕 encabezado opcional
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(value || "");
    const [filtered, setFiltered] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);
    const [error, setError] = useState(""); // 🆕 Manejo de error visual
    const selectRef = useRef(null);

    // 🔹 Filtrar o mostrar todas las opciones
    useEffect(() => {
        let filteredOptions;
        if (!allowFreeText && open) {
            filteredOptions = options;
        } else {
            filteredOptions = options.filter((opt) =>
                (opt.label || opt)
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }
        setFiltered(filteredOptions);

        // Mostrar mensaje de “no hay resultados”
        if (search && filteredOptions.length === 0 && allowFreeText) {
            setShowEmpty(true);
        } else {
            setShowEmpty(false);
        }
    }, [search, options, allowFreeText, open]);

    // 🔹 Ocultar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setOpen(false);
                setShowEmpty(false);
                setError(""); // Limpia errores al cerrar

                // 🆕 Mantener valor visible al perder foco
                if (!search && value) setSearch(value);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value, search]);

    // 🔹 Actualiza visualmente si el valor externo cambia (por ejemplo, limpieza desde Zustand)
    useEffect(() => {
        if (value === "") {
            setSearch("");
        }
    }, [value]);

    // 🧩 Maneja selección de opción
    const handleSelect = (opt) => {
        const selectedValue = opt.value ?? null;

        // ⚠️ Si la opción no tiene "value", mostrar error
        if (selectedValue === null || selectedValue === undefined) {
            setError("⚠️ Esta opción no tiene un valor asignado");
            setShowEmpty(false);
            setOpen(false);
            return;
        }

        // ✅ Si tiene valor, proceder normalmente
        onChange(selectedValue);
        if (showSelected) setSearch(opt.label || opt);
        else setSearch("");
        setOpen(false);
        setShowEmpty(false);
        setError("");
    };

    return (
        <div className={`banner-select ${className}`} style={{ width }} ref={selectRef}>
            {label && <label className="data-select-label">{label}</label>}

            <div
                className={`banner-input-box ${open ? "focus" : ""}`}
                onClick={() => {
                    setOpen(true);
                    if (!allowFreeText) setFiltered(options);
                }}
            >
                {icon && (
                    <box-icon
                        type="regular"
                        className="banner-box-icon"
                        size="sm"
                        name={icon}
                        color="var(--ccborde)"
                    ></box-icon>
                )}

                <input
                    name={label || "dataselect"}
                    type="text"
                    value={search}
                    placeholder={placeholder}
                    readOnly={!allowFreeText}
                    onFocus={() => {
                        setOpen(true);
                        if (!allowFreeText) setFiltered(options);
                    }}
                    onChange={(e) => {
                        if (allowFreeText) {
                            setSearch(e.target.value);
                            setOpen(true);
                            onChange(e.target.value);
                        }
                    }}
                />
            </div>

            {/* 🔽 Lista de opciones */}
            {open && filtered.length > 0 && (
                <div className="dropdown">
                    {header && <div className="dropdown-header">{header}</div>}
                    {filtered.map((opt, i) => (
                        <div key={i} className="option" onClick={() => handleSelect(opt)}>
                            {icon && (
                                <box-icon
                                    className="banner-box-icon"
                                    size="sm"
                                    name={opt.icon}
                                    type="regular"
                                    color="var(--ccborde)"
                                ></box-icon>
                            )}
                            <div className="option-text">
                                <h3>{opt.label || opt}</h3>
                                {opt.detail && <small>{opt.detail}</small>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔹 Mensajes dinámicos */}
            {open && showEmpty && allowFreeText && (
                <div className="dropdown empty fade-out">No hay resultados</div>
            )}

            {error && (
                <div className="dropdown empty fade-out error">{error}</div>
            )}
        </div>
    );
};

export default DataSelect;
