// src/components/FoodParticles.jsx
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const FoodParticles = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);

    const options = useMemo(() => ({
        background: { color: "#053E3B" }, // fondo blanco
        particles: {
            number: { value: 700, density: { enable: false } }, // 700 partículas
            shape: { type: ["circle", "square", "triangle"] }, // varias formas
            size: { value: { min: 3, max: 8 }, random: true }, // tamaños aleatorios
            color: {
                value: [
                    "#ff0000", // rojo puro
                    "#00cc00", // verde intenso
                    "#ffff33", // amarillo brillante
                    "#ff9900"  // naranja fuerte
                ],
            },
            opacity: { value: { min: 0.7, max: 1 }, random: true },
            move: {
                enable: true,
                direction: "bottom",
                speed: { min: 0.8, max: 1.5 }, // caída más lenta
                straight: false,
                random: { enable: true, minimumValue: 0.1 }, // movimiento lateral leve
                outModes: { default: "destroy" }, // desaparecen al llegar abajo
            },
        },
        detectRetina: true,
    }), []);

    return (
        ready && (
            <Particles
                id="food-particles"
                options={options}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                }}
            />
        )
    );
};

export default FoodParticles;
