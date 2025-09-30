import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLoginStore } from "../store/useLoginStore.js";
import "./Navbar.css";

export default function Navbar() {
    const openLogin = useLoginStore((state) => state.openLogin);
    const [setMenuOpen] = useState(false);
    const [darkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const closeMenu = () => {
        setMenuOpen(false);
    };
    console.log(closeMenu);

    useEffect(() => {

        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img src="/logos/logobgnull.png" alt="Foodvice" className="logo-img" />
                </NavLink>
            </div>

            <div className="menu-nav">
                <ul>
                    <li>

                        <NavLink
                            onClick={openLogin}
                            className={({ isActive }) => (isActive ? "" : "")}
                        >
                            ingresar
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}
