import { NavLink } from "react-router-dom";
import useLoginStore from "../store/useLoginStore";

import "./Navbar.css";

export default function Navbar() {
    const { user, openLogin, openAvatar } = useLoginStore();

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
                        {user ? (
                            <>
                                <div
                                    className="user-info"
                                    onClick={openAvatar} // ahora abre desde el store
                                >
                                    <img
                                        src={user.avatar || "/icons/avatar-default.png"}
                                        alt={user.name}
                                        className="user-avatar"
                                    />
                                    <span className="user-name">{user.name}</span>
                                </div>


                            </>
                        ) : (
                            <button className="login-btn" onClick={openLogin}>
                                Ingresar
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}
