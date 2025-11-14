import React, { useEffect, useState } from "react";
import ReservaModal from "./ReservaModal";
import "./StickyMenu.css";

export default function StickyMenu() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("descripcion");

    useEffect(() => {
        const heroSection = document.querySelector("#hero");
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsSticky(!entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(heroSection);
        return () => observer.disconnect();
    }, []);

    // 🔍 Detecta automáticamente la sección visible
    useEffect(() => {
        const sections = document.querySelectorAll("#descripcion, #menu, #opiniones");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.8 } // visible al menos un 40%
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection(id);
        }
    };

    return (
        <div className={`sticky-wrapper ${isSticky ? "fixed" : ""}`}>
            <div className="container">
                <div className={`sticky-menu ${isSticky ? "enter" : "exit"}`}>
                    <div className="menu-left">
                        <ul>
                            <li
                                onClick={() => scrollTo("hero")}
                                className={activeSection === "hero" ? "active" : ""}
                            >
                                Fotos
                            </li>
                            <li
                                onClick={() => scrollTo("descripcion")}
                                className={activeSection === "descripcion" ? "active" : ""}
                            >
                                Descripción
                            </li>
                            <li
                                onClick={() => scrollTo("menu")}
                                className={activeSection === "menu" ? "active" : ""}
                            >
                                Menú
                            </li>
                            <li
                                onClick={() => scrollTo("opiniones")}
                                className={activeSection === "opiniones" ? "active" : ""}
                            >
                                Opiniones
                            </li>

                        </ul>
                    </div>

                    <div className="menu-right">
                        <ul>
                            <li
                                onClick={() => scrollTo("reservar")}
                                className={activeSection === "reservar" ? "active" : ""}
                            >
                                Reservar una mesa
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}
