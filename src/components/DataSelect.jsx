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

                // 🆕 Si tiene valor por defecto, se mantiene al perder foco
                if (!search && value) setSearch(value);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value, search]);
    useEffect(() => {
        // Si el valor externo cambia (por ejemplo, se limpia desde el store),
        // actualiza el valor local del input.
        if (value === "") {
            setSearch("");
        }
    }, [value]);

    const handleSelect = (opt) => {
        const selectedLabel = opt.label || opt;
        onChange(selectedLabel);
        if (showSelected) setSearch(selectedLabel);
        else setSearch("");
        setOpen(false);
        setShowEmpty(false);
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
                                ></box-icon>
                            )}
                            <div className="option-text">

                                <h3>{opt.label || opt}</h3>
                                {opt.detail}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔹 Mensaje "no hay resultados" solo si allowFreeText */}
            {open && showEmpty && allowFreeText && (
                <div className="dropdown empty fade-out">No hay resultados</div>
            )}
        </div>
    );
};

export default DataSelect;
