import { useState } from "react";
import useLoginStore from "../store/useLoginStore";
import "./RegisterSide.css";

export default function RegisterSide() {
    const { isOpenRegister, closeRegister, registerUser, isLoading, error } = useLoginStore();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isClosing, setIsClosing] = useState(false); // 👈 efecto de cierre

    if (!isOpenRegister && !isClosing) return null;

    const handleRegister = async () => {
        const res = await registerUser({ email, phone, name, lastName });
        if (res.success) {
            // register guarda user y cierra register
        }
    };

    // 👇 efecto de cerrado
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            closeRegister();
        }, 300); // debe coincidir con la duración de la transición en CSS
    };

    return (
        <>
            <div className="overlay" onClick={handleClose} />
            <div className={`login-drawer ${isOpenRegister && !isClosing ? "open" : "close"}`}>
                <div className="drawer-header">
                    <h2>Crear cuenta</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="drawer-img"><img src="/fondos/bannerimg.png" alt="Food vice" /></div>

                <div className="drawer-content">
                    <label>Correo *</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                    <label>Celular (será tu password) *</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                    <label>Nombre *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <label>Apellidos (opcional)</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />

                    {error && <p style={{ color: "red", padding: 10, fontSize: 14, }}>{error}</p>}

                    <button className="primary-btn" onClick={handleRegister} disabled={isLoading}>
                        {isLoading ? "Creando..." : "Registrar"}
                    </button>
                </div>

                {/* <div className="drawer-footer">
                    <p>¿Ya tienes cuenta?</p>
                    <button className="link-btn" onClick={() => { handleClose(); openLogin(); }}>
                        Iniciar sesión
                    </button>
                </div> */}
            </div>
        </>
    );
}
