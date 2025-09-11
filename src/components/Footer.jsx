import { NavLink } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-first">
                        <div className="logo">
                            <NavLink to="/">Foodvice</NavLink>
                        </div>
                        <div className="footer-social">
                            <a href="#" className="footer-social-links">
                                <i className="bx bxl-google social-login-icon"></i>
                            </a>
                            <a href="#" className="footer-social-links">
                                <i className="bx bxl-facebook social-login-icon"></i>
                            </a>
                            <a href="#" className="footer-social-links">
                                <i className="bx bxl-twitter social-login-icon"></i>
                            </a>
                            <a href="#" className="footer-social-links">
                                <i className="bx bxl-tiktok social-login-icon"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-second">
                        <div className="footer-contact">
                            <h4 className="footer__copy">CONTACTOS :</h4>
                            <p className="footer__info">
                                <i className="bx bx-envelope social-login-icon">
                                    admin@foodvice.com
                                </i>
                            </p>
                            <p className="footer__info">
                                Telefono: 554-433-2211
                            </p>
                            <p className="footer__info">
                                Dirección 1234, Calle Principal, Ciudad de México.
                            </p>
                        </div>
                    </div>
                    <div className="footer-third">
                        <nav className="footer-links">
                            <a href="/" className="footer-link">Nosotros</a>
                            <a href="/" className="footer-link">Servicios</a>
                            <a href="/" className="footer-link">FAQS</a>

                        </nav>
                        <form className="footer__newsletter">
                            <input type="email" placeholder="Email" className="footer__email" />
                            <input type="submit" value="Suscribete " className="footer__submit" />
                        </form>

                    </div>
                </div>
                <div className="footer__copyright">
                    <p className="footer__copyright-text">&copy; PDVO Soluciones Integrales - Derechos reservados.</p>
                </div>
            </div>
        </>
    )
}

export default Footer