import { useLoginStore } from "../store/useLoginStore";
import "./LoginSide.css";

export default function LoginSide() {
    const { isOpen, closeLogin } = useLoginStore();

    return (
        <>
            {/* Fondo oscuro */}
            {isOpen && <div className="overlay" onClick={closeLogin} />}

            {/* Panel lateral */}
            <div className={`login-drawer ${isOpen ? "open" : ""}`}>
                {/* Encabezado */}
                <div className="drawer-header">
                    <h2>Inicia sesión</h2>
                    <button className="close-btn" onClick={closeLogin}>
                        ✕
                    </button>
                </div>

                {/* Contenido */}
                <div className="drawer-content">
                    <label>Dirección de correo electrónico *</label>
                    <input type="email" placeholder="Tu dirección de correo electrónico" />

                    <button className="primary-btn">Continuar</button>

                    <div className="divider">
                        <hr />
                        <span>o</span>
                        <hr />
                    </div>

                    <button className="facebook-btn">Conectar con Facebook</button>
                    <button className="google-btn">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                        />
                        Iniciar sesión con Google
                    </button>

                    <p className="note">
                        🔒 No publicaremos nada sin tu autorización. <br />
                        ⚡ ¡Así es mucho más rápido!
                    </p>
                </div>

                {/* Footer */}
                <div className="drawer-footer">
                    <button className="link-btn">Registrar mi restaurante</button>
                    <button className="link-btn">Ayuda</button>
                </div>
            </div>
        </>
    );
}
