import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ show }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
        } else {
            // tiempo para permitir que la animación de salida ocurra
            setTimeout(() => setVisible(false), 500);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div className={`loader-overlay ${show ? "fade-in" : "fade-out"}`}>

            <h2 className="border">Loading</h2>
            <h2 className="wave">Loading</h2>

        </div>
    );
}
