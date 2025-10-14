import { useState, useEffect, useRef } from "react";
import { useSearchStore } from "../store/useSearchStore";
import "./CitySelect.css";

export default function CitySelect() {
  const options = [
    "Santa Cruz",
    "Cochabamba",
    "La Paz",
    "Oruro",
    "Tarija",
  ];

  const { city, setCity } = useSearchStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(city);
  const selectRef = useRef(null);

  // Filtrar según lo que se escriba
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Sincroniza el valor local con el global
  useEffect(() => setSearch(city), [city]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setCity(opt);
    setSearch(opt);
    setOpen(false);
  };

  return (
    <div className="banner-select" ref={selectRef}>
      <div
        className={`banner-input-box ${open ? "focus" : ""}`}
        onClick={() => setOpen(true)}
      >
        <box-icon
          className="banner-box-icon"
          size="md"
          name="map-pin"
          type="solid"
        ></box-icon>

        <input
          type="text"
          value={search}
          placeholder="Elige una ciudad..."
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="dropdown">
          {filtered.map((opt, i) => (
            <div key={i} className="option" onClick={() => handleSelect(opt)}>
              <box-icon
                className="banner-box-icon"
                size="md"
                name="map"
                type="solid"
              ></box-icon>
              {opt}
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
