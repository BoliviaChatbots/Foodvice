import React, { useState, useEffect, useMemo, useRef } from "react";
import { useReservaStore } from "../store/useReservaStore";
import "./ReservaModal.css";

/* 🔹 Helpers fuera del componente */

// Formato corto de fecha en español
const formatDateShort = (iso) => {
    try {
        const d = new Date(iso + "T00:00:00-04:00"); // fuerza hora boliviana
        return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    } catch {
        return iso;
    }
};

// Devuelve días del mes actual (lunes a domingo)
const getMonthDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const offset = (firstDay.getDay() + 6) % 7; // lunes como inicio
    for (let i = 0; i < offset; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d));
    }

    return days;
};

// 🔹 Devuelve la fecha local boliviana (sin UTC)
const getLocalDateISO = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

export default function ReservaModal({ restaurante }) {
    const [selFecha, setSelFecha] = useState("");
    const [selHora, setSelHora] = useState("");
    const [selPersonas, setSelPersonas] = useState("");
    const [openStep, setOpenStep] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [horasDisponibles, setHorasDisponibles] = useState([]);

    const { setFecha, setHora, setPersonas, setRestauranteId } = useReservaStore();
    const blockRef = useRef(null);
    const maxPersonas = restaurante?.maxPersonasPorMesa ?? 8;

    // Reinicia cuando cambia el restaurante
    useEffect(() => {
        setSelFecha("");
        setSelHora("");
        setSelPersonas("");
        setOpenStep(null);
        setShowOverlay(false);
    }, [restaurante?.id]);

    const monthTitle = useMemo(
        () =>
            currentMonth.toLocaleString("es-ES", {
                month: "long",
                year: "numeric",
            }),
        [currentMonth]
    );

    const monthDays = useMemo(() => getMonthDays(currentMonth), [currentMonth]);

    const todayISO = getLocalDateISO(); // ✅ hoy en hora boliviana

    const openFor = (step) => {
        setOpenStep(step);
        setShowOverlay(true);
        if (restaurante?.id) setRestauranteId(restaurante.id);
    };

    const closeAll = () => {
        setOpenStep(null);
        setShowOverlay(false);
    };

    const onSelectFecha = (dateISO) => {
        setSelFecha(dateISO);
        const fechaObj = new Date(dateISO + "T00:00:00-04:00"); // fuerza hora Bolivia
        const diaNombre = fechaObj
            .toLocaleDateString("es-ES", { weekday: "long" })
            .toLowerCase();

        const horarios = restaurante?.diasAtencion?.[diaNombre] ?? [];
        setHorasDisponibles(horarios);
        setOpenStep("hora");
    };

    const onSelectHora = (h) => {
        setSelHora(h);
        setOpenStep("personas");
    };

    const onSelectPersonas = (n) => {
        setSelPersonas(n);
        setFecha(selFecha || "");
        setHora(selHora);
        setPersonas(n);
        closeAll();

        console.log("✅ Reserva completa:", {
            restaurante: restaurante?.titulo ?? restaurante?.name ?? null,
            fecha: selFecha,
            hora: selHora,
            personas: n,
        });
    };

    const prevMonth = () =>
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );

    const nextMonth = () =>
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );

    const isDayActive = (dateObj) => {
        if (!restaurante?.diasAtencion) return false;
        const weekday = dateObj
            .toLocaleDateString("es-ES", { weekday: "long" })
            .toLowerCase();
        const horarios = restaurante.diasAtencion[weekday];
        return Array.isArray(horarios) && horarios.length > 0;
    };

    // 🔹 Evitar seleccionar fechas anteriores a hoy (hora Bolivia)
    const isPastDate = (dateObj) => {
        const iso = getLocalDateISO(dateObj);
        return iso < todayISO;
    };

    return (
        <div className="reserva-block" ref={blockRef}>
            {/* Botones principales */}
            <div className="reserva-button-group" role="group" aria-label="selector reserva">
                <button
                    className={`res-btn ${openStep === "fecha" ? "active" : ""}`}
                    onClick={() => openFor("fecha")}
                    type="button"
                >
                    <box-icon type="regular" size="sm" color="var(--colormaster)" name="calendar-edit" className="icon"></box-icon>
                    <span className="label">
                        {selFecha ? formatDateShort(selFecha) : "Fecha"}
                    </span>
                </button>

                <button
                    className={`res-btn ${openStep === "hora" ? "active" : ""}`}
                    onClick={() => openFor("hora")}
                    type="button"
                    disabled={!selFecha}
                >
                    <box-icon type="regular" size="sm" color="var(--colormaster)" name="timer" className="icon"></box-icon>
                    <span className="label">{selHora || "Hora"}</span>
                </button>

                <button
                    className={`res-btn ${openStep === "personas" ? "active" : ""}`}
                    onClick={() => openFor("personas")}
                    type="button"
                    disabled={!selHora}
                >
                    <box-icon type="regular" size="sm" color="var(--colormaster)" name="group" className="icon"></box-icon>
                    <span className="label">
                        {selPersonas ? `${selPersonas} Pers.` : "Personas"}
                    </span>
                </button>
            </div>

            {showOverlay && <div className="reserva-overlay" onClick={closeAll} />}

            {/* Modal Fecha */}
            {openStep === "fecha" && (
                <div className="reserva-modal calendario" onClick={(e) => e.stopPropagation()}>
                    <div className="cal-header">
                        <button className="cal-nav" onClick={prevMonth}>‹</button>
                        <div className="cal-title">{monthTitle}</div>
                        <button className="cal-nav" onClick={nextMonth}>›</button>
                    </div>

                    <div className="cal-weekdays">
                        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                            <div key={i} className="cal-weekday">{d}</div>
                        ))}
                    </div>

                    <div className="cal-grid">
                        {monthDays.map((d, i) => {
                            if (!d) return <div key={i} className="cal-cell empty" />;
                            const iso = d.toISOString().split("T")[0];
                            const active = isDayActive(d) && !isPastDate(d);

                            // ✅ Detectar si es hoy
                            const isToday = iso === todayISO;

                            return (
                                <button
                                    key={i}
                                    className={`cal-cell day 
                    ${active ? "active" : "disabled"} 
                    ${selFecha === iso ? "selected" : ""} 
                    ${isToday ? "today" : ""}`.trim()}
                                    onClick={() => active && onSelectFecha(iso)}
                                    disabled={!active}
                                    title={
                                        !active
                                            ? isPastDate(d)
                                                ? "Fecha pasada"
                                                : "No hay atención"
                                            : isToday
                                                ? "Hoy"
                                                : "Seleccionar fecha"
                                    }
                                >
                                    {d.getDate()}
                                </button>
                            );
                        })}
                    </div>

                </div>
            )}

            {/* Modal Hora */}
            {openStep === "hora" && (
                <div className="reserva-modal horas" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-head">
                        <button className="close-x" onClick={closeAll}>×</button>
                        <div className="modal-title">Elige la hora</div>
                    </div>

                    <div className="horas-grid">
                        {horasDisponibles.length ? (
                            horasDisponibles.map((h) => (
                                <button
                                    key={h}
                                    className={`hora-pill ${selHora === h ? "selected" : ""}`}
                                    onClick={() => onSelectHora(h)}
                                >
                                    {h}
                                </button>
                            ))
                        ) : (
                            <div className="no-data">No hay horarios disponibles</div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal Personas */}
            {openStep === "personas" && (
                <div className="reserva-modal personas" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-head">
                        <button className="close-x" onClick={closeAll}>×</button>
                        <div className="modal-title">¿Cuántas personas?</div>
                    </div>

                    <div className="horas-grid">
                        {Array.from({ length: maxPersonas }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                className={`hora-pill ${selPersonas === n ? "selected" : ""}`}
                                onClick={() => onSelectPersonas(n)}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
