// src/components/ParticleBackground.jsx
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // carga el preset liviano (más rápido y menos pesado)
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: "#F2A900", // fondo azul
            },
            particles: {
                number: {
                    value: 60,
                    density: { enable: true, area: 800 },
                },
                color: { value: "#ffffff" },
                links: {
                    enable: true,
                    color: "#ffffff",
                    distance: 150,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                },
            },
        }),
        []
    );

    return (
        ready && (
            <Particles
                id="tsparticles"
                options={options}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
        )
    );
}
