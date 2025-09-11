

import { useEffect, useRef, useState } from "react";
import "./AskandQuest.css";

export default function AskandQuest() {
    const [stuck, setStuck] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Si el navbar está "pegado" al top
                setStuck(!entry.isIntersecting);
            },
            { threshold: [1], rootMargin: "0px 0px 0px 0px" }
        );

        if (navbarRef.current) {
            observer.observe(navbarRef.current);
        }

        return () => {
            if (navbarRef.current) observer.unobserve(navbarRef.current);
        };
    }, []);

    return (

        <nav ref={navbarRef} className={`navbar ${stuck ? "stuck" : ""}`}>
            {/* Lado izquierdo */}
            <div className="left">
                <span className="logo">Mi Logo</span>
                {stuck && <button className="btn special-btn">Nuevo</button>}
            </div>

            {/* Lado derecho */}
            <div className="right">
                {!stuck && <button className="btn login-btn">Login</button>}
                {stuck && <button className="btn profile-btn">Perfil</button>}
            </div>
        </nav>

    );
}
