import { NavLink } from "react-router-dom";
import useLoginStore from "../store/useLoginStore";

import "./Navbar.css";

export default function Navbar() {
    const { user, openLogin, openAvatar } = useLoginStore();
    // 👇 función para abrir el chat en una nueva pestaña
    const handleChatClick = () => {
        window.open("http://192.168.0.6/murochat/public/", "_blank");
    };

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img src="/logos/logobgnull.png" alt="Foodvice" className="logo-img-nav" />
                </NavLink>
            </div>

            <div className="menu-nav">
                <ul>
                    <li>
                        <div className="user-info" onClick={handleChatClick}>
                            <span className="user-name-icon">Chat online</span>
                            <box-icon
                                type="regular"
                                className="user-avatar"
                                size="sm"
                                color="grey"
                                name="chat"
                            ></box-icon>
                            {/* <img src="/logo.png" alt="Foodvice" className="user-avatar" /> */}
                        </div>

                    </li>
                    <li>

                        {user ? (
                            <>
                                <div
                                    className="user-info"
                                    onClick={openAvatar} // ahora abre desde el store
                                >
                                    <span className="user-name">{user.name}</span>
                                    <img
                                        src={user.avatar || "/icons/avatar-default.png"}
                                        alt={user.name}
                                        className="user-avatar"
                                    />

                                </div>


                            </>
                        ) : (
                            <>
                                <div className="user-info" onClick={openLogin}>
                                    <span className="user-name">Ingresar</span>
                                    <box-icon
                                        type="regular"
                                        className="user-avatar"
                                        size="sm"
                                        color="grey"
                                        name="user"
                                    ></box-icon>

                                </div>
                            </>
                            // <button className="btn-primary" onClick={openLogin}>
                            //     Ingresar
                            // </button>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}
