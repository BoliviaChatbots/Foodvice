import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    console.log('Estado= ', darkMode);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark"); // para aplicar el dark en <body>
    };

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
        <header className={`header ${darkMode ? "dark" : ""}`}>
            <div className="logo">
                <NavLink to="/">
                    <img src="/logos/logobgnull.png" alt="Foodvice" className="logo-img" />
                </NavLink>
            </div>

            <nav className={`menu-wrap ${menuOpen ? "show-hide" : ""}`}>
                <ul>
                    <li>
                        <NavLink
                            to="/login"
                            end
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            INGRESAR
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Inicio
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <NavLink
                            to="/contact"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Contactos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/showroom"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            ShowRoom
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/restaurants"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Restaurantes
                        </NavLink>
                    </li> */}

                </ul>
            </nav>

            <div className="main-toggle-wrap hidden">
                <button onClick={toggleDarkMode} className="darkmode-toggle hidden">
                    <box-icon type='solid' name='moon' className='moon-icon'></box-icon>
                    <box-icon type='solid' name='sun' className='sun-icon'></box-icon>
                </button>

                <button onClick={toggleMenu} className="mobile-menu-toggle">
                    <box-icon name='menu' className='menu-icon'></box-icon>

                </button>
            </div>
        </header>
    );
}
