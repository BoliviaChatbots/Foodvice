import { useState, useRef } from "react";
import useLoginStore from "../store/useLoginStore";
import "./LoginSide.css";

export default function LoginSide() {
    const {
        isOpenLogin,
        closeLogin,
        openRegister,
        loginUser,
        isLoading,
        error,
    } = useLoginStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isClosing, setIsClosing] = useState(false);
    const drawerRef = useRef(null);
    const overlayRef = useRef(null);

    // Si el modal no está abierto y no está cerrando, no renderizamos nada
    if (!isOpenLogin && !isClosing) return null;

    const handleClose = () => {
        setIsClosing(true);
        // Espera a que termine la animación (0.3s según tu CSS)
        setTimeout(() => {
            setIsClosing(false);
            closeLogin();
        }, 300);
    };

    const handleLogin = async () => {
        const res = await loginUser(email, password);
        if (!res.success) return;
    };

    // Evita cerrar el modal al hacer clic dentro del drawer
    const handleDrawerClick = (e) => e.stopPropagation();

    return (
        <>
            <div
                ref={overlayRef}
                className={`overlay ${isClosing ? "closing" : ""}`}
                onClick={handleClose}
            />

            <div
                ref={drawerRef}
                className={`login-drawer ${isClosing ? "closing" : "open"}`}
                onClick={handleDrawerClick}
            >
                <div className="drawer-header">
                    <h2>Iniciar sesión</h2>
                    <button className="close-btn" onClick={handleClose}>
                        ✕
                    </button>
                </div>

                <div className="drawer-img">
                    <img src="/fondos/bannerimg.png" alt="Food vice" />
                </div>

                <div className="drawer-content">
                    {/* <label>Correo electrónico *</label> */}
                    <input
                        placeholder="Correo electrónico o Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />

                    {/* <label>Contraseña *</label> */}
                    <input
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    {error && <p style={{ color: "red", padding: 10, fontSize: 14, }}>{error}</p>}
                    <div className="drawer-btns">
                        <button
                            className="primary-btn"
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? "Revisando..." : "Ingresar"}
                        </button>

                        {/* Botón Google */}
                        <button
                            className="google-btn"
                            onClick={() => {
                                loginUser(
                                    {
                                        name: "Usuario Google",
                                        email: "googleuser@demo.com",
                                        avatar: "https://i.pravatar.cc/150?u=google",
                                    },
                                    "google-token-456"
                                );
                                closeLogin();
                            }}
                        >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google"
                            />
                            Iniciar sesión con Google
                        </button>

                        {/* Botón Facebook */}
                        {/* <button
                            className="facebook-btn"
                            onClick={() => {
                                loginUser(
                                    {
                                        name: "Usuario Facebook",
                                        email: "fbuser@demo.com",
                                        avatar: "https://i.pravatar.cc/150?u=facebook",
                                    },
                                    "fb-token-123"
                                );
                                closeLogin();
                            }}
                        >
                            Conectar con Facebook
                        </button> */}
                    </div>


                </div>

                <div className="drawer-footer">
                    <p>¿No tienes cuenta?</p>
                    <button
                        className="link-btn"
                        onClick={() => {
                            handleClose(); // Cierra con animación
                            setTimeout(() => {
                                openRegister();
                            }, 350); // abre el RegisterSide después del fadeOut
                        }}
                    >
                        Crear una cuenta
                    </button>
                </div>
            </div>
        </>
    );
}
