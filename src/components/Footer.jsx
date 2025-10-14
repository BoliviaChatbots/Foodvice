import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* LOGO + REDES */}
                <div className="footer-first">
                    <div className="logo">
                        <NavLink to="/">
                            <img src="/logos/logobgnull.png" alt="Foodvice" className="logo-img" />
                        </NavLink>
                    </div>

                    <div className="footer-social">

                        <a href="https://www.facebook.com/polloelsolar" target="_blank" className="footer-social-links">
                            <i className="bx bxl-facebook"></i>
                        </a>
                        <a href="http://www.google.com" className="footer-social-links">
                            <i className="bx bxl-twitter"></i>
                        </a>
                        <a href="#" className="footer-social-links">
                            <i className="bx bxl-tiktok"></i>
                        </a>
                        <a href="#" className="footer-social-links">
                            <i className="bx bxl-google"></i>
                        </a>
                    </div>
                </div>

                {/* CONTACTOS */}
                <div className="footer-second">
                    <div className="footer-contact">
                        <h4 className="footer-title">Contactos</h4>
                        <p className="footer-text">
                            <i className="bx bx-envelope"></i> admin@foodvice.com
                        </p>
                        <p className="footer-text">Teléfono: 554-433-2211</p>
                        <p className="footer-text">
                            Dirección: Calle San Martin, Santa Cruz, Bolivia
                        </p>
                    </div>
                </div>

                {/* LINKS + NEWSLETTER */}
                <div className="footer-third">
                    <h4 className="footer-title">Enlaces</h4>
                    <nav className="footer-links">
                        <a href="/" className="footer-link">Nosotros</a>
                        <a href="/" className="footer-link">Servicios</a>
                        <a href="/" className="footer-link">FAQS</a>
                    </nav>

                    <form className="footer__newsletter">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="footer__email"
                        />
                        <input
                            type="submit"
                            value="Suscribirse"
                            className="footer__submit"
                        />
                    </form>
                </div>
            </div>

            <div className="footer__copyright">
                <p>&copy; PDVO Soluciones Integrales - Derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
