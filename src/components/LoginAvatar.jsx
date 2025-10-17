import { useState } from "react";
import useLoginStore from "../store/useLoginStore";
import EditUser from "./EditUser";
import "./LoginAvatar.css";
import "./LoginSide.css"; // reutiliza estilos

export default function LoginAvatar() {
    const { user, isOpenAvatar, closeAvatar, openEditUser, logout } = useLoginStore();
    const [isClosing, setIsClosing] = useState(false);

    if (!user) return null;
    if (!isOpenAvatar && !isClosing) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            closeAvatar();
        }, 150);
    };

    const handleLogout = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            closeAvatar();
        }, 300);
        setTimeout(() => {
            logout();
        }, 300);

        // handleClose();
    };

    return (
        <>
            <div className="overlay" onClick={handleClose}></div>
            <div className={`login-drawer ${isOpenAvatar && !isClosing ? "open" : "close"}`}>
                <div className="drawer-header">
                    <h2>Mi perfil</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="avatar-section">
                    <img
                        src={user.avatar || "/icons/avatar-default.png"}
                        alt={user.name}
                        className="avatar-large"
                    />
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>

                <div className="drawer-content">
                    <div className="drawer-btns">
                        <button className="primary-btn" onClick={openEditUser}>Editar perfil</button>
                        <button className="primary-btn" onClick={handleLogout}>Cerrar sesion</button>
                    </div>
                </div>
            </div>
        </>
    );
}
