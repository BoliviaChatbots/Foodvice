import React, { useState, useEffect } from "react";
import useLoginStore from "../store/useLoginStore";
import "./LoginSide.css"; // estilos base y animaciones (overlay, login-drawer, etc.)
import "./EditUser.css"; // estilos específicos del avatar / pequeños ajustes

export default function EditUser() {
    const { user, isOpenEditUser, closeEditUser, updateUser } = useLoginStore();

    const [isClosing, setIsClosing] = useState(false);
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        avatar: "",
    });

    // al abrir, cargamos los datos del usuario en el formulario
    useEffect(() => {
        if (user && isOpenEditUser) {
            setForm({
                name: user.name || "",
                lastname: user.lastname || "",
                email: user.email || "",
                phone: user.phone || "",
                avatar: user.avatar || "/icons/avatar-default.png",
            });
        }
    }, [user, isOpenEditUser]);

    // Si no está abierto y tampoco está en animación de cierre, no renderizamos
    if (!isOpenEditUser && !isClosing) return null;

    const handleClose = () => {
        setIsClosing(true);
        // tiempo igual a la duración de tu animación (ej. 300ms)
        setTimeout(() => {
            setIsClosing(false);
            closeEditUser();
        }, 300);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // actualizas el user en el store (o llamas a la API aquí)
        updateUser({
            name: form.name,
            lastname: form.lastname,
            email: form.email,
            phone: form.phone,
            avatar: form.avatar,
        });
        handleClose();
    };

    return (
        <>
            {/* overlay: reutiliza las animaciones (añadimos clase closing si está cerrando) */}
            <div
                className={`overlay ${isClosing ? "closing" : ""}`}
                onClick={handleClose}
            />

            {/* drawer: reutiliza .login-drawer y estados .open / .closing */}
            <div
                className={`login-drawer ${isOpenEditUser && !isClosing ? "open" : ""} ${isClosing ? "closing" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="drawer-header">
                    <h2>Editar perfil</h2>
                    <button className="close-btn" onClick={handleClose}>
                        ✕
                    </button>
                </div>

                {/* imagen dentro de drawer-img para reutilizar estilos existentes */}
                <div className="drawer-img" style={{ paddingTop: 12 }}>
                    <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                        <img
                            src={form.avatar || "/icons/avatar-default.png"}
                            alt="avatar"
                            className="avatar-large"
                        />
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                    />
                </div>

                <form className="drawer-content" onSubmit={handleSubmit}>
                    <label>Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Celular</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label>Apellidos</label>
                    <input
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                    />

                    <button type="submit" className="primary-btn" style={{ marginTop: 12 }}>
                        Guardar
                    </button>
                </form>
            </div>
        </>
    );
}
